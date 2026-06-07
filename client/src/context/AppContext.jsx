import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  function login(tok) { setToken(tok); }
  function logout() { localStorage.clear(); setToken(null); }
  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", String(next));
  }

  return (
    <AppContext.Provider value={{ token, login, logout, darkMode, toggleDark }}>
      <div className={darkMode ? "dark" : ""}>{children}</div>
    </AppContext.Provider>
  );
}

export function useApp() { return useContext(AppContext); }
