"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./manager.module.css";

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
        console.log("Appending Requests,", data);

        setRequests(data || req);
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
  const req = [{id : 1 , username : "Testeur ", requestTime : "2025-11-12T12:00"},{id : 2 , username : "Javateur ", requestTime : "2025-11-12T12:00"}] 
  if (loading) return <p>Loading requests for {resourceName}...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (requests.length === 0) return <p>No pending requests for {resourceName}.</p>;

  return (
    <div style={{margin:"10dvh 10dvw" }}>
      <h1 style={{textAlign:"center", marginBottom:"10px"}}>Pending Requests for "<b style={{color: "#00ced1de" , textTransform:"uppercase"}}>{resourceName}</b>"</h1>
      <ul>
        {requests.map((req) => (
          <li key={req.id} className={styles.list}>
            <div>
            <p><strong>Team:</strong> {req.username || "Unknown"}</p>
            <p><strong>Request Time:</strong> {new Date(req.requestTime).toLocaleString()}</p>
            </div>
            <div >
            <button onClick={() => handleAction(req.id, "approve")} className={styles.buttons} style={{ marginRight: "1rem" , backgroundColor:"#3fe94c" , boxShadow:"2px 2px 2px red"}}>
              Approve
            </button>
            <button onClick={() => handleAction(req.id, "revoke")} className={styles.buttons} style={{backgroundColor:"red" , boxShadow:"2px 2px 2px #10ed10" }}>Revoke</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
