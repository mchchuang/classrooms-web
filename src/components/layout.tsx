import Cookies from "js-cookie";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  username: string;
  onSignOut: () => void;
}

const Layout: React.FC<LayoutProps> = ({ username, onSignOut }) => {
  const defaultOpen = Cookies.get("sidebar:state") === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar username={username} onSignOut={onSignOut} />
      <main className="w-full">
        <SidebarTrigger className="bg-white dark:bg-black focus:outline-none focus:ring-0 active:bg-transparent" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
