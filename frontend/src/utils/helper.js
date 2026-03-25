// Global logout handler for API interceptors
let logoutCallback = null;
let currentToken = null;
let isLoggingOut = false;

export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

export const setCurrentToken = (token) => {
  currentToken = token;
};

export const triggerLogout = () => {
  if (logoutCallback && !isLoggingOut) {
    isLoggingOut = true;
    logoutCallback(true); // true indicates token expired
  }
};

export const resetLogoutFlag = () => {
  isLoggingOut = false;
};

export const getCurrentToken = () => currentToken;
