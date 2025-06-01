// middleware.js
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/cp/:path*', '/ctf/:path*', '/ce/:path*'], // add paths to protect
};

export async function middleware(req) {
  const token = req.cookies.get('Authorization')?.value;
  // console.log('✅ Middleware triggered for:', token);
  const pathSegments = req.nextUrl.pathname.split('/');
  const rootPath = pathSegments[1]; // e.g. "cp"

  // Allow homepage access without token
  if (!token && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url));
  }
  const resourceMap = {
    cp: 1,
    ctf: 2,
    ce: 3,
  }
  
  const resourceId = resourceMap[rootPath]
  //  remove the comment when ready

  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resources/my-access`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('✅ Middleware intered for fetch ');
    console.log(res.ok)
    if (res.ok) {
      // const pendingUrl = new URL(
      //   `/access-pending?resourceId=${resource.resourceId}&redirect=${req.nextUrl.pathname}`,
      //   req.url
      // );
      // return NextResponse.redirect(pendingUrl);

      const data = await res.json();
      console.log(data)
    //   const accessList = [
    //     {
    //         "id": 1,
    //         "resourceId": 1,
    //         "resourceName": "ctf",
    //         "accessGranted": true,
    //         "requestTime": "2025-06-01T09:52:29.166094",
    //         "grantTime": "2025-06-01T09:54:55.725495",
    //         "userId": null,
    //         "username": null
    //     },
    //     {
    //       "id": 1,
    //       "resourceId": 2,
    //       "resourceName": "cp",
    //       "accessGranted": false,
    //       "requestTime": "2025-06-01T09:52:29.166094",
    //       "grantTime": "2025-06-01T09:54:55.725495",
    //       "userId": null,
    //       "username": null
    //   }
    // ];
    const accessList = data.map((item) => ({
      resourceId: item.resourceId,
      resourceName: item.resourceName,
      accessGranted: item.accessGranted,
    }));
    console.log("access list : ", accessList)
      const resource = accessList.find(
        (item) => item.resourceName.toLowerCase() === rootPath.toLowerCase()
      );
      console.log("resource", resource)
      if (resource) {
        if (resource.accessGranted) {
          return NextResponse.next();
        } else {
          // Redirect to client-side polling page
          const pendingUrl = new URL(
            `/access-pending?resourceId=${resource.resourceId}&redirect=${req.nextUrl.pathname}`,
            req.url
          );
          return NextResponse.redirect(pendingUrl);
        }
      } else {
        // No access record — request access
        const requestRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resources/request`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resourceId}), // get the id of the resource from the frontend
        });
        console.log("message after submitting," , requestRes)
        if (requestRes.ok) {
          const pendingUrl = new URL(
            `/access-pending?resourceName=${rootPath}&redirect=${req.nextUrl.pathname}`,
            req.url
          );
          return NextResponse.redirect(pendingUrl);
        } else {
          // Fallback redirect if request fails
          return NextResponse.redirect(new URL('/home', req.url));
        }
      }
    }
  }

  return NextResponse.next();
}

