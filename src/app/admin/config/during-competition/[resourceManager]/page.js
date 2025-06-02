"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ResourceManagerPage() {
  const params = useParams();
  const resourceName = params.resourceManager; // dynamic segment from URL
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('Admin-Auth');

  // Fetch pending requests filtered by resourceName
  useEffect(() => {
    let intervalId;
  
    async function fetchRequests() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resources/pending-requests?resourceName=${encodeURIComponent(resourceName)}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
        // console.log("Appending Requests,", data);
        setRequests(data || []);
      } catch (err) {
        setError(err.message || "Error loading requests");
      } finally {
        setLoading(false);
      }
    }
  
    // Fetch immediately on mount
    fetchRequests();
  
    // Set up polling every 3 seconds
    intervalId = setInterval(fetchRequests, 3000);
  
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [resourceName]); //resourceName

  // Handle approve/revoke actions
  async function handleAction(requestId, action) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resources/${requestId}/${action}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }});
      if (!res.ok) throw new Error(`Failed to ${action} request`);

      // Update UI: remove the request from the list after successful action
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading requests for {resourceName}...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (requests.length === 0) return <p>No pending requests for {resourceName}.</p>;

  return (
    <div>
      <h1>Pending Requests for "{resourceName}"</h1>
      <ul>
        {requests.map((req) => (
          <li key={req.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
            <p><strong>Team:</strong> {req.username || "Unknown"}</p>
            <p><strong>Request Time:</strong> {new Date(req.requestTime).toLocaleString()}</p>
            <button onClick={() => handleAction(req.id, "approve")} style={{ marginRight: "1rem" }}>
              Approve
            </button>
            <button onClick={() => handleAction(req.id, "revoke")}>Revoke</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
