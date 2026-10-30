import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Database, Code2, Server, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Edu<span className="text-indigo-400">Pulse</span> SMS
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              A comprehensive Full-Stack Academic & Student Management System built
              as a college-level mini project. Features modern REST API architecture,
              secure JWT role-based access, and direct MongoDB Compass integration.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-slate-800 text-indigo-300 border border-slate-700 font-mono">
                <Code2 className="w-3.5 h-3.5" /> React + Vite
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-slate-800 text-emerald-300 border border-slate-700 font-mono">
                <Server className="w-3.5 h-3.5" /> Node + Express
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-slate-800 text-amber-300 border border-slate-700 font-mono">
                <Database className="w-3.5 h-3.5" /> MongoDB Compass
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-slate-800 text-sky-300 border border-slate-700 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> JWT & Bcrypt
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <a href="/#features" className="hover:text-white transition-colors">
                  System Features
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/signin" className="hover:text-white transition-colors">
                  Portal Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Faculty Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Academic Submission
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Course: Full Stack Web Development</li>
              <li>Type: College Mini Project</li>
              <li>Architecture: MERN (React, Express, Node, Mongo)</li>
              <li>DB Port: 127.0.0.1:27017</li>
              <li>API Base: /api/students, /api/auth</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} EduPulse SMS. Developed for Academic
            Demonstration and Evaluation.
          </p>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> using Modern Web Standards
          </div>
        </div>
      </div>
    </footer>
  );
};

