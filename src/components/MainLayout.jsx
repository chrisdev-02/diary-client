import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { BookOpen, Code2, User, LogOut } from 'lucide-react';

export default function MainLayout({ user, onLogout }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        {/* Brand & Tabs */}
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> My Page
          </h1>
          <nav className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <Link
              to="/home/diary"
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                location.pathname === '/home/diary'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4" /> Diary
            </Link>
            <Link
              to="/home/projects"
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                location.pathname === '/home/projects'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="h-4 w-4" /> Projects
            </Link>
          </nav>
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
            <div className="bg-indigo-500/20 text-indigo-400 p-1 rounded-full">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-slate-200">{user?.name || 'User'}</span>
          </div>
          <button
            onClick={onLogout}
            className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}