"use client";

import { Header } from "@/components/dashboard/header";
import MobileSidebar  from "@/components/dashboard/mobile-sidebar";
import { useState, ReactNode } from "react";


export default function DashboardClient({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    return (
      <>
        <MobileSidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        <div className="flex flex-col flex-1">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </>
    );
  }
  