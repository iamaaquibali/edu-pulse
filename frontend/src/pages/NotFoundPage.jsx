import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
            <FileQuestion className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800">404</h1>
          <h2 className="text-xl font-bold text-slate-700">Page Not Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page you are looking for does not exist or has been moved to another location.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

