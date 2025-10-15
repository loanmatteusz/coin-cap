import React from "react";
import { AppSidebar } from "../components/AppSidebar";
import { AppNavbar } from "../components/AppNavbar";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <main className="flex-1 flex flex-col">
        <AppNavbar />
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
