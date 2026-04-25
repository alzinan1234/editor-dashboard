"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  HandHelping,
  Hexagon,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  LucideIcon,
} from "lucide-react";

// 1. Define types for navigation items
interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

// 2. Define types for Component Props
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const navItems: NavItem[] = [
  { name: "Dashboards", href: "/editor", icon: LayoutGrid },
  { 
    name: "Content Manage...", 
    href: "/editor/content", 
    icon: HandHelping 
  },
  {
    name: "Settings",
    href: "/editor/settings",
    icon: Hexagon,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  setIsOpen, 
  isCollapsed, 
  setIsCollapsed 
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActiveRoute = (item: NavItem): boolean => {
    if (item.href === "/editor") return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  if (!mounted) return null;

  const activeGradient = "linear-gradient(90deg, #343E87 12.02%, #3448D6 50%, #343E87 88.46%)";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white text-[#636363] z-50
          transition-all duration-300 ease-in-out border-r border-gray-100
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isCollapsed ? "w-20" : "w-72"}
        `}
      >
        <div className="flex flex-col h-full">
          
          {/* Logo Section */}
          <div className={`flex items-center h-24 px-6 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <img src="/oped (2).png" alt="Logo" className="w-[116px]" />
              </div>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
            >
              {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 px-4 py-4 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center min-h-[54px] rounded-[10px] transition-all
                    ${isCollapsed ? "justify-center px-0" : "gap-4 px-4"}
                    ${isActive ? "text-white shadow-md shadow-blue-900/10" : "text-[#8E92BC] hover:bg-gray-50"}
                  `}
                  style={{
                    background: isActive ? activeGradient : "transparent",
                  }}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-[#8E92BC]"}`} strokeWidth={2.5} />
                  {!isCollapsed && (
                    <span className={`text-[15px] font-medium font-sans ${isActive ? "text-white" : "text-[#8E92BC]"}`}>
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Logout Section */}
          {/* <div className="p-4 mt-auto mb-4">
             <button className={`
                flex items-center gap-4 w-full h-[54px] rounded-[10px] bg-[#FFF0F0] text-[#FF5B5B] hover:bg-[#FFE5E5] transition-all
                ${isCollapsed ? "justify-center px-0" : "px-6"}
             `}>
                <LogOut className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="text-[15px] font-medium font-serif">
                    Logout
                  </span>
                )}
             </button>
          </div> */}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;