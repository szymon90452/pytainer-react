import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { X, Menu as MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Menu from "@/modules/Menu/Menu";
import AccountMenu from "@/modules/AccountMenu/AccountMenu";

const PrivateTemplate = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <MenuIcon />}
          </Button>
          <Label
            className="cursor-pointer text-lg ml-4 md:text-xl md:ml-0"
            onClick={() => navigate("/")}>
            Pytainer
          </Label>
          <div className="flex-1" />
          <AccountMenu />
        </div>
      </header>
      <div className="flex">
        <Menu isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-4 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateTemplate;
