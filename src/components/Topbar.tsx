// Topbar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, User, LogOut, Settings } from "lucide-react";
import { TokenService } from "@/components/apiClient";
import NotificationBell from "@/components/NotificationBell";

interface TopbarProps {
  toggleMobileMenu: () => void;
}

interface UserData {
  id: string;
  email: string;
  name?: string;
  profileImage?: string;
  role?: string;
}

const Topbar: React.FC<TopbarProps> = ({ toggleMobileMenu }) => {
  const router = useRouter();
  const [userName, setUserName]         = useState<string>("");
  const [userAvatar, setUserAvatar]     = useState<string>("");
  const [userRole, setUserRole]         = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUserData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") loadUserData();
    };
    const handleProfileUpdate = () => loadUserData();
    const handleUserUpdate    = () => loadUserData();

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("storage",        handleStorageChange);
    window.addEventListener("profileUpdated", handleProfileUpdate);
    window.addEventListener("userUpdated",    handleUserUpdate);
    document.addEventListener("mousedown",    handleClickOutside);

    return () => {
      window.removeEventListener("storage",        handleStorageChange);
      window.removeEventListener("profileUpdated", handleProfileUpdate);
      window.removeEventListener("userUpdated",    handleUserUpdate);
      document.removeEventListener("mousedown",    handleClickOutside);
    };
  }, []);

  const loadUserData = () => {
    const user = TokenService.getUser() as UserData | null;
    if (user) {
      setUserName(user.name || "Editor");
      setUserAvatar(user.profileImage || "");
      setUserRole(user.role || "editor");
    } else {
      setUserName("Editor");
      setUserAvatar("");
      setUserRole("editor");
    }
  };

  const getInitial = () =>
    userName && userName.length > 0 ? userName.charAt(0).toUpperCase() : "E";

  const getRoleBadgeColor = () => {
    switch (userRole.toLowerCase()) {
      case "admin":  return "bg-purple-100 text-purple-700";
      case "editor": return "bg-blue-100 text-blue-700";
      case "writer": return "bg-green-100 text-green-700";
      default:       return "bg-gray-100 text-gray-700";
    }
  };

  const handleLogout = () => {
    TokenService.clearTokens();
    router.push("/");
    setShowDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between lg:justify-end bg-white px-4 py-3 border-b border-gray-100 shadow-sm font-sans">
      
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-3">

        {/* ── Notification Bell ── */}
        <NotificationBell />

        {/* ── User Profile Dropdown ── */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="relative rounded-full border-2 border-gray-100 hover:border-[#3448D6] transition-all overflow-hidden w-10 h-10 bg-gray-100 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3448D6] focus-visible:ring-offset-2"
            aria-label="User menu"
            aria-expanded={showDropdown}
          >
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <span className="text-sm font-bold text-gray-600">{getInitial()}</span>
            )}
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-slideDown">
              
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#343E87] to-[#3448D6] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {getInitial()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
                    <p className="text-xs text-gray-500">Editor Account</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getRoleBadgeColor()}`}>
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                {/* <button
                  onClick={() => { router.push("/editor/profile"); setShowDropdown(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} className="text-gray-400" />
                  <span>My Profile</span>
                </button> */}

                <button
                  onClick={() => { router.push("/editor/settings"); setShowDropdown(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings size={16} className="text-gray-400" />
                  <span>Settings</span>
                </button>

                <div className="border-t border-gray-100 my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Topbar;