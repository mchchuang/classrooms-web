import { User } from "@/utils/types";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import md_file from "@/assets/test.md";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface Props {
  user: User;
}

const LessonsPage: React.FC<Props> = ({ user }) => {
  const [lesson, setLesson] = React.useState("");
  useEffect(() => {
    fetch(md_file)
      .then((res) => res.text())
      .then((text) => {
        console.log(text);
        setLesson(text);
      });
  }, []);

  return (
    <div className="flex flex-col items-start justify-start p-10 w-full min-h-screen -mt-7 text-left">
      {/* <h1 className="text-4xl font-bold mb-4 self-start">Lesson</h1>
       */}
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full flex-grow"
      >
        <ResizablePanel defaultSize={25}>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose prose-zinc lg:prose-xl dark:prose-invert code-block w-full pl-10"
          >
            {lesson}
          </ReactMarkdown>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LessonsPage;
