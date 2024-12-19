import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { User } from "@/utils/types";
import React from "react";

interface Props {
  user: User;
}

const AccountPage: React.FC<Props> = ({ user }) => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user) {
        throw new Error("User not found.");
      }

      if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
        throw new Error("Please fill in all fields.");
      }

      if (oldPassword === newPassword) {
        throw new Error("New password cannot be the same as old password.");
      }

      // Check that new password has at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        throw new Error(
          "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
        );
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const res = await fetch(
        `${process.env.API_ENDPOINT}/auth/update_password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: oldPassword,
            new_password: newPassword,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast({
        title: "Password updated",
        description: "Your password has been updated.",
      });
    } catch (e) {
      toast({
        title: "Error updating password",
        description:
          e instanceof Error ? e.message : "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-start justify-start w-full min-h-screen m-10 flex-col -mt-7">
      <div className="text-left mb-4">
        <h1 className="text-4xl font-bold self-start font-mono">Account</h1>
        <p className="text-gray-700 dark:text-gray-300 font-mono">
          Manage your account information.
        </p>
      </div>
      <div className="flex flex-row gap-28 flex-wrap items-center mb-4">
        <div className="text-left">
          <h1 className="text-xl font-bold self-start font-mono">Full Name</h1>
          <p className="text-gray-700 dark:text-gray-300 font-mono">
            {user.first_name} {user.last_name}
          </p>
        </div>
        <div className="text-left">
          <h1 className="text-xl font-bold self-start font-mono">Username</h1>
          <p className="text-gray-700 dark:text-gray-300 font-mono">
            {user.username}
          </p>
        </div>
      </div>
      <div className="flex flex-col flex-wrap items-center">
        <form
          onSubmit={updatePassword}
          className="w-full max-w-md flex flex-col flex-wrap items-center"
        >
          <h1 className="text-xl font-bold self-start font-mono mb-2">
            Reset Password
          </h1>
          <Label
            htmlFor="old_password"
            className="self-start font-mono required"
          >
            Old Password
          </Label>
          <Input
            name="old_password"
            id="old_password"
            className="mb-1"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          ></Input>
          <Label
            htmlFor="new_password"
            className="self-start font-mono required"
          >
            New Password
          </Label>
          <Input
            name="new_password"
            id="new_password"
            className="mb-1"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></Input>
          <Label
            htmlFor="confirm_password"
            className="self-start font-mono required"
          >
            Confirm Password
          </Label>
          <Input
            name="confirm_password"
            id="confirm_password"
            className="mb-2"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
          <Button type="submit" className="self-start">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
