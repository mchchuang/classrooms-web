import { User } from "@/utils/types";
import React from "react";

interface HomePageProps {
  user: User;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen -mt-7">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 self-start">
          Welcome back, {user.first_name}!
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
