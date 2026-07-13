import React, { useState } from 'react';
import { Cpu, Bell, LogIn, LogOut, User, Layout, ShieldAlert } from 'lucide-react';
import { User as UserType, Notification } from '../types';

interface NavbarProps {
  currentUser: UserType | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigate: (view: 'home' | 'dashboard' | 'admin') => void;
  currentView: 'home' | 'dashboard' | 'admin';
  notifications: Notification[];
  onMarkNotificationsRead: () => void;
}

export default function Navbar({
  currentUser,
  onOpenAuth,
  onLogout,
  onNavigate,
  currentView,
  notifications,
  onMarkNotificationsRead
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.isRead && (n.userId === 'all' || n.userId === currentUser?.id));

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadNotifications.length > 0) {
      onMarkNotificationsRead();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800" id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="p-2 bg-gradient-to-tr from-[#00979c] to-[#00f2fe] rounded-lg shadow-lg shadow-teal-500/10">
              <Cpu className="h-6 w-6 text-slate-900" id="logo-icon" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-teal-400 bg-clip-text text-transparent">
                ZERON
              </span>
              <span className="text-xs block font-mono text-teal-400 tracking-widest font-semibold uppercase -mt-1">
                TRAINING ACADEMY
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#curriculum" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">
              Curriculum
            </a>
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">
              FAQ
            </a>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                {/* Notifications Panel */}
                <div className="relative">
                  <button
                    onClick={handleNotificationClick}
                    className="p-2 text-slate-400 hover:text-teal-400 rounded-full hover:bg-slate-800 transition-all relative"
                    id="notif-btn"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                        {unreadNotifications.length}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 overflow-hidden z-50">
                      <h3 className="font-semibold text-sm text-slate-200 mb-3 border-b border-slate-800 pb-2 flex justify-between items-center">
                        <span>Announcements</span>
                        {unreadNotifications.length > 0 && (
                          <span className="text-[10px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                            New updates
                          </span>
                        )}
                      </h3>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-500 text-center py-4">No notifications yet</p>
                        ) : (
                          notifications
                            .filter(n => n.userId === 'all' || n.userId === currentUser.id)
                            .map(n => (
                              <div key={n.id} className="p-2 rounded bg-slate-950 border-l-2 border-teal-500 text-left">
                                <p className="text-xs font-semibold text-slate-300">{n.title}</p>
                                <p className="text-[11px] text-slate-400 mt-1">{n.message}</p>
                                <span className="text-[9px] text-slate-500 block mt-1 font-mono">{n.date}</span>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Dashboard Button */}
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => onNavigate(currentView === 'admin' ? 'home' : 'admin')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currentView === 'admin'
                        ? 'bg-amber-500/10 border border-amber-500 text-amber-400'
                        : 'bg-[#00979c] hover:bg-[#005f63] text-slate-950 shadow-md shadow-teal-500/10'
                    }`}
                    id="admin-nav-btn"
                  >
                    <ShieldAlert className="h-4 w-4" />
                    {currentView === 'admin' ? 'Exit Admin' : 'Admin Panel'}
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate(currentView === 'dashboard' ? 'home' : 'dashboard')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currentView === 'dashboard'
                        ? 'bg-teal-500/10 border border-teal-500 text-teal-400'
                        : 'bg-[#00979c] hover:bg-[#005f63] text-slate-950 shadow-md shadow-teal-500/10'
                    }`}
                    id="dash-nav-btn"
                  >
                    <Layout className="h-4 w-4" />
                    {currentView === 'dashboard' ? 'Back to Home' : 'My Dashboard'}
                  </button>
                )}

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-red-400 font-medium transition-colors"
                  id="logout-btn"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#00979c] to-[#4facfe] hover:from-[#005f63] hover:to-[#00979c] text-slate-950 text-sm font-semibold rounded-lg shadow-lg shadow-teal-500/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                id="login-trigger"
              >
                <LogIn className="h-4 w-4 text-slate-950" />
                Login / Register
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
              id="mobile-menu-btn"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <a
            href="#curriculum"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-teal-400 rounded-lg"
          >
            Curriculum
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-teal-400 rounded-lg"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-teal-400 rounded-lg"
          >
            Pricing
          </a>
          {currentUser && (
            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-base font-medium text-red-400 hover:bg-slate-900 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
