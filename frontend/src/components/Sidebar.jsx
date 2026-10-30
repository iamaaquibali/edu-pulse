import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  LogOut,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const navItems = [
    {
      to: '/dashboard',
      label: 'Overview & Stats',
      icon: LayoutDashboard,
    },
    {
      to: '/students',
      label: 'Student Records',
      icon: Users,
    },
    {
      to: '/profile',
      label: 'Profile Settings',
      icon: UserCheck,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        {/* Navigation Items */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* System Info Box */}
        <div className="bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100/60 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MongoDB Connected</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Collections <code className="text-indigo-600 font-mono">users</code> &{' '}
            <code className="text-indigo-600 font-mono">students</code> synchronized.
          </p>
          <div className="pt-1">
            <span className="inline-block px-2 py-0.5 text-[10px] bg-white rounded border border-slate-200 text-slate-600 font-mono">
              Port: 27017
            </span>
          </div>
        </div>
      </div>

      {/* User profile bottom card */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {user?.name}
            </p>
            <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200/60 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

