import { User } from "@/utils/types";
import React from "react";

interface Props {
  user: User;
}

const ClassesPage: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 self-start">Classes</h1>
      </div>
    </div>
  );
};

export default ClassesPage;
