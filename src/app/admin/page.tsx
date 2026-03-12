"use client";

import { useState } from "react";
import { LogOut, LayoutDashboard, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/admin/kanban-board";
import { LeadsPanel } from "@/components/admin/leads-panel";

const TABS = [
  { id: "kanban", label: "Projetos", icon: LayoutDashboard },
  { id: "leads", label: "Leads", icon: Users },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("kanban");

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 glass border-b border-border/30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="font-tusker text-sm text-bone uppercase tracking-wider hover:text-cognac transition-colors">
              Athila <span className="text-cognac">Cabrall</span>
            </a>
            <ChevronRight className="h-3 w-3 text-bone/20" />
            <span className="text-xs text-bone/50 font-poppins">Admin</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs"
            onClick={handleLogout}
          >
            <LogOut className="mr-1.5 h-3 w-3" />
            Sair
          </Button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="border-b border-border/20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 text-xs font-poppins font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "text-cognac"
                  : "text-bone/40 hover:text-bone/60"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cognac"
                  layoutId="admin-tab-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {activeTab === "kanban" && <KanbanBoard />}
        {activeTab === "leads" && <LeadsPanel />}
      </main>
    </div>
  );
}
