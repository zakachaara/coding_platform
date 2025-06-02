'use client';
import {  useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from "./access.module.css";

export default function AccessPending() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resourceId = searchParams.get('resourceId');
  const redirectTo = searchParams.get('redirect') || '/';

  const [status, setStatus] = useState('Requesting access...');
  const [isPolling, setIsPolling] = useState(true);
  const token = localStorage.getItem('Authorization');
  useEffect(() => {
    
    if (!token || !resourceId) {
      setStatus('Invalid request. Missing token or resource.');
      return;
    }

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resources/my-access`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // console.log(data)
        const resources = data.map((item) => ({
            resourceId: item.resourceId,
            resourceName: item.resourceName,
            accessGranted: item.accessGranted,
          }));

        const match = resources.find(r => r.resourceId == resourceId);
        // console.log("matching :", match)
        if (match && match.accessGranted) {
          setStatus('Access granted! Redirecting...');
          clearInterval(pollInterval);
          setIsPolling(false);
          setTimeout(() => {
            router.push(redirectTo);
          }, 1000);
        } else {
          setStatus('Waiting for access to be granted...');
        }
      } catch (err) {
        setStatus('Error while checking access.' + err);
        clearInterval(pollInterval);
        setIsPolling(false);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [resourceId, redirectTo, router]); // 

  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <h1 className={styles.heading}>Access Pending</h1>
      
      <br></br>
      {!isPolling ? <p className={styles.message}>Polling for access... Don't switch Tabs </p> : <p className={styles.status}>{status}</p> }
    </div>
    </div>
  );
}
