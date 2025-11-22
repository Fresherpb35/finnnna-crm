"use client"
import React, { useEffect, useCallback } from 'react';
import { X, Settings, Home, Users, CheckSquare, Briefcase, FileText, BarChart3, MessageSquare } from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Leads & Pipelines', href: '/dashboard/lead-pipelines', icon: BarChart3 },
  { label: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { label: 'Clients', href: '/dashboard/clients', icon: Users },
  { label: 'Accounting Reports', href: '/dashboard/accounting-reports', icon: FileText },
  { label: 'HR Analytics', href: '/dashboard/hr-analysis', icon: Briefcase },
  { label: 'Chat Support', href: '/dashboard/chat-support', icon: MessageSquare }
];

export default function Sidebar({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeMenuItem = 'Dashboard',
  userImage = '/images/user.png',
  userName = 'User'
}) {
  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen, setSidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const handleProfileClick = useCallback(() => {
    window.location.href = '/dashboard/profile';
  }, []);

  const handleSettingsClick = useCallback(() => {
    window.location.href = '/dashboard/settings';
  }, []);

  const handleMenuClick = useCallback((href) => {
    window.location.href = href;
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [setSidebarOpen]);

  const handleOverlayClick = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-64 bg-linear-to-b from-purple-950 via-purple-900 to-purple-950 transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out shadow-2xl lg:relative overflow-y-auto scrollbar-hide`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Profile Section */}
        <div className="flex items-center justify-between p-6 lg:p-6 border-b border-white/10">
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-2 -m-2"
            aria-label="Go to profile"
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-white/20 shadow-lg">
              <img 
                src={userImage} 
                alt={`${userName}'s profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E';
                }}
              />
            </div>

            <div className="text-left">
              <p className="text-white font-semibold text-base lg:text-lg">
                Welcome!
              </p>
              <p className="text-white/70 text-sm">
                {userName}
              </p>
            </div>
          </button>

          <button 
            onClick={handleCloseSidebar} 
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Menu */}
        <nav className="py-4 pb-28" aria-label="Main menu">
          <ul className="space-y-1">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.label === activeMenuItem;
              
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleMenuClick(item.href)}
                    className={`flex items-center gap-3 px-6 py-4 transition-all w-full text-left text-base lg:text-base ${
                      isActive
                        ? 'text-white bg-white/10 border-l-4 border-white font-semibold shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Settings - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-purple-950 to-transparent py-6 px-6 border-t border-white/10">
          <button 
            onClick={handleSettingsClick}
            className="flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/10 transition-all w-full text-left px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Go to settings"
          >
            <Settings size={20} className="shrink-0" />
            <span className="text-base lg:text-base font-medium">Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}