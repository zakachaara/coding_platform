"use client";
import React, { useState, useEffect } from "react";
import styles from "./button.module.css";
const CounTdownTimer = ({startingDate , duration}) => {
  const [eventStartingDate, setEventStartingDate] = useState("");
  const [eventEndingDate, setEventEndingDate] = useState("");
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [eventStarted, setEventStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [untilEnd, setUntilEnd] = useState(0);
  // Initialize starting and ending dates
  useEffect(() => {
    if (startingDate && duration) {
      setEventStartingDate(startingDate);

      const start = new Date(startingDate);
      const [hours, minutes] = duration.split(":").map(Number);
      start.setHours(start.getHours() + hours);
      start.setMinutes(start.getMinutes() + minutes);
      setEventEndingDate(start.toISOString());

      setCountdownStarted(true); // Automatically start countdown when initialized
    }
  }, [startingDate, duration]);
  //   This is used to track the time before the start of the event
  useEffect(() => {
    if (countdownStarted && eventStartingDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(eventStartingDate).getTime();
        let remainingTime = eventTime - currentTime;

        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
          setEventStarted(true);
          // alert("countdown started!");
        }

        setTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdownStarted, eventStartingDate]);

  // This one is used to track the duration of the event until its end :
  useEffect(() => {
    if (eventStarted && eventEndingDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(eventEndingDate).getTime();
        let remainingTime = eventTime - currentTime;

        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
          alert("Competiton is over !");
        }

        setUntilEnd(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [eventStarted, eventEndingDate]);


  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className={styles.countdown_display}>
        {days.toString().padStart(2, "0")}:{hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </div>
    );
  };

  return (
        <>
          {!eventStarted && <div style={{display:"flex" ,  width: "max-content"}}>-{formatTime(timeRemaining)}</div>}
          {eventStarted && formatTime(untilEnd)}

        </>
      )}

export default CounTdownTimer;
