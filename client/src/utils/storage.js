// src/utils/storage.js

export const saveDebuggerSession = (session) => {
  const sessions = JSON.parse(localStorage.getItem("debuggerSessions")) || [];
  sessions.push(session);
  localStorage.setItem("debuggerSessions", JSON.stringify(sessions));
};

export const getDebuggerSessions = () => {
  return JSON.parse(localStorage.getItem("debuggerSessions")) || [];
};

export const clearDebuggerSessions = () => {
  localStorage.removeItem("debuggerSessions");
};
