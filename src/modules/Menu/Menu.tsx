import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { FileCode, Home, Users } from "lucide-react";

const Menu = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <nav className="space-y-2 p-4">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button
          onClick={() => navigate("/scripts")}
          variant="ghost"
          className="w-full justify-start">
          <FileCode className="mr-2 h-4 w-4" />
          Scripts
        </Button>
        <Button
          onClick={() => navigate("/users")}
          variant="ghost"
          className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Users
        </Button>
      </nav>
    </aside>
  );
};

export default Menu;
