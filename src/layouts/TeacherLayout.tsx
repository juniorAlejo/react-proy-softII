import React, { ReactNode } from "react";
import Header from "../components/Header/index";
import Sidebar from "../components/Sidebar/index";
import { Outlet } from "react-router-dom";

const TeacherLayout: React.FC<{ children: ReactNode }> = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden ">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="px-10 pt-8 pb-10 ">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export { TeacherLayout };
