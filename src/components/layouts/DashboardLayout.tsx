import * as React from "react";
import { Link, useMatches } from "@tanstack/react-router";
import {
  Menu,
  X,
  LayoutDashboard,
  BarChart2,
  Settings as SettingsIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/stores/app";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isSidebarOpen, toggleSidebar } = useAppStore();
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => match.routeId !== "__root__")
    .map((match) => {
      const path = match.routeId.replace(/\//g, "");
      const name =
        path === ""
          ? "Dashboard"
          : path.charAt(0).toUpperCase() + path.slice(1);
      return { name, path: match.pathname };
    });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar for larger screens */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 hidden border-r bg-background transition-all duration-300 lg:flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6" />
            <span className={cn("", !isSidebarOpen && "hidden")}>
              Satify Dashboard
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-auto py-2">
          <ul className="grid items-start gap-2 px-4 text-sm font-medium lg:px-6">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                activeProps={{ className: "text-primary bg-muted" }}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className={cn("", !isSidebarOpen && "hidden")}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                activeProps={{ className: "text-primary bg-muted" }}
              >
                <BarChart2 className="h-4 w-4" />
                <span className={cn("", !isSidebarOpen && "hidden")}>
                  Analytics
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                activeProps={{ className: "text-primary bg-muted" }}
              >
                <SettingsIcon className="h-4 w-4" />
                <span className={cn("", !isSidebarOpen && "hidden")}>
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <div
        className={cn("flex flex-col", isSidebarOpen ? "lg:ml-64" : "lg:ml-20")}
      >
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          {/* Mobile sidebar toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <LayoutDashboard className="h-6 w-6" />
                  <span>Satify Dashboard</span>
                </Link>
                <Link
                  to="/"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-muted" }}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/analytics"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-muted" }}
                >
                  <BarChart2 className="h-5 w-5" />
                  Analytics
                </Link>
                <Link
                  to="/settings"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-muted" }}
                >
                  <SettingsIcon className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Breadcrumbs */}
          <div className="flex-1">
            <nav className="hidden text-sm font-medium md:flex items-center space-x-1">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  {index > 0 && (
                    <span className="text-muted-foreground">/</span>
                  )}
                  <Link to={crumb.path} className="hover:text-primary">
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* User dropdown and theme toggle */}
          <div className="flex items-center gap-4 ml-auto">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <img
                    src="https://github.com/shadcn.png"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
