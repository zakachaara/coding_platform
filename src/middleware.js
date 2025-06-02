// middleware.js
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/cp/:path*", "/ctf/:path*", "/ce/:path*", "/admin/config/:path*"], // add paths to protect
};

export async function middleware(req) {
  const token = req.cookies.get("Authorization")?.value;
  // console.log('✅ Middleware triggered for:', token);
  const pathSegments = req.nextUrl.pathname.split("/");
  const rootPath = pathSegments[1]; // e.g. "cp"

  if (rootPath === "admin") {
    const admintoken = req.cookies.get("Admin-Authorization")?.value;
    if (admintoken) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (rootPath === "home") {
    const admintoken = req.cookies.get("Admin-Authorization")?.value;
    if (admintoken || token) return NextResponse.next();
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow homepage access without token
  if (!token && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const resourceMap = {
    cp: 1,
    ctf: 2,
    ce: 3,
  };

  const resourceId = resourceMap[rootPath];
  //  remove the comment when ready

  if (token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/resources/my-access`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("✅ Middleware intered for fetch ");
    console.log(res.ok);
    if (res.ok) {
      const data = await res.json();
      console.log(data);

      const accessList = data.map((item) => ({
        resourceId: item.resourceId,
        resourceName: item.resourceName,
        accessGranted: item.accessGranted,
      }));
      console.log("access list : ", accessList);
      const resource = accessList.find(
        (item) => item.resourceName.toLowerCase() === rootPath.toLowerCase()
      );
      console.log("resource", resource);
      if (resource) {
        if (resource.accessGranted) {
          return NextResponse.next();
        } else {
          // Redirect to client-side polling page
          const pendingUrl = new URL(
            `/access-pending?resourceId=${resourceId}&redirect=${req.nextUrl.pathname}`,
            req.url
          );
          return NextResponse.redirect(pendingUrl);
        }
      } else {
        // No access record — request access
        const requestRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/resources/request`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resourceId }), // get the id of the resource from the frontend
          }
        );
        console.log("message after submitting,", requestRes);
        if (requestRes.ok) {
          const pendingUrl = new URL(
            `/access-pending?resourceId=${resourceId}&redirect=${req.nextUrl.pathname}`,
            req.url
          );
          return NextResponse.redirect(pendingUrl);
        } else {
          // Fallback redirect if request fails
          return NextResponse.redirect(new URL("/home", req.url));
        }
      }
    }
  }

  return NextResponse.next();
}
