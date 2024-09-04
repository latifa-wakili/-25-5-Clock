import React, { useState, useEffect } from "react";

const Clock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const startStopTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      setIntervalId(setInterval(() => setTimeLeft((prev) => prev - 1), 1000));
    }
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setIsSession(true);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      const audio = document.getElementById("beep");
      audio.play();
      setIsSession(!isSession);
      setTimeLeft((isSession ? breakLength : sessionLength) * 60);
    }
  }, [timeLeft, isSession, breakLength, sessionLength]);

  const incrementBreak = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const decrementBreak = () => {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  };

  const incrementSession = () => {
    if (sessionLength < 60) setSessionLength(sessionLength + 1);
  };

  const decrementSession = () => {
    if (sessionLength > 1) setSessionLength(sessionLength - 1);
  };

  return (
    <div className="clock">
      <div id="break-label">Break Length</div>
      <div id="session-label">Session Length</div>
      <button id="break-decrement" onClick={decrementBreak}>-</button>
      <div id="break-length">{breakLength}</div>
      <button id="break-increment" onClick={incrementBreak}>+</button>
      <button id="session-decrement" onClick={decrementSession}>-</button>
      <div id="session-length">{sessionLength}</div>
      <button id="session-increment" onClick={incrementSession}>+</button>

      <div id="timer-label">{isSession ? "Session" : "Break"}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={startStopTimer}>Start/Stop</button>
      <button id="reset" onClick={resetTimer}>Reset</button>

      <audio id="beep" src="https://www.soundjay.com/button/beep-07.wav"></audio>
    </div>
  );
};

export default Clock;
