import { User } from "@/utils/types";
import React from "react";

interface Props {
  user: User;
}

const ClassesPage: React.FC<Props> = ({ user }) => {
  const [classes, setClasses] = React.useState([]);

  return (
    <div className="flex flex-col items-start justify-start w-full min-h-screen p-10 -mt-7">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 self-start">Classes</h1>
      </div>
      {classes.length === 0 ? (
        <div className="flex items-center justify-start w-full h-full">
          <p className="text-center">You are not in any classes.</p>
        </div>
      ) : (
        <p>Class</p>
      )}
    </div>
  );
};

export default ClassesPage;
