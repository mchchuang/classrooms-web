import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./components/layout";
import Login from "./login";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./hooks/use-toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const checkAuthStatus = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/me", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      const data = await res.json();

      if (res.ok) {
        setIsLoggedIn(true);
        setUsername(data.username);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (res.ok) {
        setIsLoggedIn(false);
        setUsername("");
        toast({
          title: "Signed out",
          description: "You have been signed out.",
        });
      } else {
        console.error("Error signing out");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex items-center justify-center min-h-screen w-screen">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Router>
            {isLoggedIn ? (
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout username={username} onSignOut={handleSignOut} />
                  }
                >
                  <Route index element={<Home />} />
                  {/* Add more routes here */}
                </Route>
              </Routes>
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </Router>
        )}
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
