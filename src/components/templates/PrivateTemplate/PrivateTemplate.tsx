import { useState } from "react"
import { Outlet } from "react-router-dom";
import { Menu, X, User, Home, Settings, HelpCircle, LogOut, FileCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const PrivateTemplate = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="flex h-16 items-center justify-between px-4 sm:px-8">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <X /> : <Menu />}
                    </Button>
                    <div className="flex-1" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <User className="h-5 w-5" />
                                <span className="sr-only">User account</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Help
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <div className="flex">
                <aside
                    className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <nav className="space-y-2 p-4">
                        <Button variant="ghost" className="w-full justify-start">
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <FileCode className="mr-2 h-4 w-4" />
                            Scripts
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Help
                        </Button>
                    </nav>
                </aside>

                <main className="flex-1 p-4 md:ml-64">
                    <Outlet />
                </main>
            </div>
        </div>
    )
};

export default PrivateTemplate;