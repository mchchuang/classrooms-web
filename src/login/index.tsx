import React, { useState } from "react";
import styles from "./login.module.scss";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  IncorrectPasswordError,
  InvalidUsernameError,
  RequirePasswordError,
  RequireUsernameError,
} from "@/lib/errors";
import { toast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const credentialsAction = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!username) {
        throw new RequireUsernameError("Username is required.");
      }

      if (!password) {
        throw new RequirePasswordError("Password is required.");
      }

      // Login using http://localhost:3000/auth/login with username and password in the body
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "Could not find username.") {
          throw new InvalidUsernameError(data.message);
        } else if (data.message === "Incorrect password.") {
          throw new IncorrectPasswordError(data.message);
        }
        throw new Error("An unknown error has occurred.");
      }

      onLogin(username); // Call onLogin when login is successful
    } catch (e) {
      toast({
        title: "Login Error",
        description:
          e instanceof Error ? e.message : "An unknown error has occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-96">
      <form onSubmit={credentialsAction}>
        <CardHeader>
          <CardTitle className="text-left">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.formGroup}>
            <Label htmlFor="username" className="block text-left">
              Username
            </Label>
            <Input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="password" className="block text-left">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <Button type="button" variant="link" className="text-left">
              Forgot Password?
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
