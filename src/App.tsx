import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./components/layout";
import Login from "./login";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./hooks/use-toast";
import { User } from "./utils/types";
import Account from "./pages/Account";
import Lessons from "./pages/Lessons";

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(user === null);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/auth/me`, {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
      } else {
        setUser(null);
        sessionStorage.removeItem("user");
      }
    } catch (error) {
      toast({
        title: "Error checking auth status",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
      setUser(null);
      sessionStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    !user ? checkAuthStatus() : setLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/";
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/auth/logout`, {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (res.ok) {
        setUser(null);
        toast({
          title: "Signed out",
          description: "You have been signed out.",
        });
      } else {
        throw Error("An error occurred while signing out.");
      }
      sessionStorage.removeItem("user");
    } catch (error) {
      toast({
        title: "Error signing out",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex items-center justify-center min-h-screen w-screen">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Router>
            {user ? (
              <Routes>
                <Route
                  path="/"
                  element={<Layout user={user} onSignOut={handleSignOut} />}
                >
                  <Route index element={<Home user={user} />} />
                  <Route path="classes" element={<Classes user={user} />} />
                  <Route path="account" element={<Account user={user} />} />
                  <Route path="lessons" element={<Lessons user={user} />} />
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
