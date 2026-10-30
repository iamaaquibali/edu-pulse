import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  BarChart3,
  Database,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Server,
  Terminal,
} from 'lucide-react';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Users,
      color: 'bg-indigo-500',
      title: 'Complete Student CRUD',
      description:
        'Create, view, update, and manage student demographic, contact, and academic records with instant MongoDB synchronization.',
    },
    {
      icon: BarChart3,
      color: 'bg-emerald-500',
      title: 'Aggregated Analytics',
      description:
        'Visualize department distributions, overall average CGPA, active enrollment ratios, and recent system actions at a glance.',
    },
    {
      icon: ShieldCheck,
      color: 'bg-amber-500',
      title: 'JWT & Bcrypt Security',
      description:
        'Robust authorization with salted bcrypt password hashing, token expiration, protected REST endpoints, and Helmet headers.',
    },
    {
      icon: Database,
      color: 'bg-sky-500',
      title: 'MongoDB Compass Ready',
      description:
        'Directly inspect collections, indices, and documents through MongoDB Compass at 127.0.0.1:27017 for grading and demonstration.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Register or Sign In',
      desc: 'Create a faculty coordinator account or sign in with the pre-seeded administrator credentials.',
    },
    {
      step: '02',
      title: 'Monitor Dashboard',
      desc: 'Get an instant overview of department strength, student CGPA performance, and recent audit logs.',
    },
    {
      step: '03',
      title: 'Manage Student Records',
      desc: 'Search, filter, enroll new students, edit existing information, or delete records after confirmation.',
    },
    {
      step: '04',
      title: 'Inspect with Compass',
      desc: 'Open MongoDB Compass to show faculty evaluators your live database schema, collections, and records.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Background decorative glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-200/40 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Full-Stack Web Development Mini Project</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Modern Academic Record & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
              Student Management System
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A production-ready college mini project built with React, Vite, Node.js,
            Express, and MongoDB. Engineered with JWT authentication, role-based controls,
            and real-time MongoDB Compass compatibility.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-[0.98]"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-[0.98]"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/signin"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm transition-all"
                >
                  Sign In to Portal
                </Link>
              </>
            )}
          </div>

          {/* Key Metric Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-extrabold text-indigo-600">MERN</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Full-Stack Stack</p>
            </div>
            <div className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-extrabold text-slate-900">100%</p>
              <p className="text-xs text-slate-500 font-medium mt-1">MongoDB Persistence</p>
            </div>
            <div className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-extrabold text-emerald-600">JWT</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Bearer Auth & Bcrypt</p>
            </div>
            <div className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-extrabold text-indigo-600">Compass</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Direct GUI Inspection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
              Core Capabilities
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Engineered for Complete Academic Operations
            </h3>
            <p className="mt-4 text-base text-slate-600">
              Everything required for departmental administrators, professors, and academic
              counselors to maintain student records accurately and securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:shadow-lg hover:border-indigo-200 transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${feat.color} text-white flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
              Simple Workflow
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              How EduPulse Powers College Evaluation
            </h3>
            <p className="mt-4 text-base text-slate-600">
              Designed for effortless live evaluation and hands-on laboratory demonstrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 relative shadow-sm"
              >
                <span className="text-3xl font-extrabold text-indigo-100 font-mono block mb-3">
                  {item.step}
                </span>
                <h4 className="text-base font-bold text-slate-800 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Academic Project Dossier
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Designed for Full-Stack Laboratory Evaluation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                This project addresses the real-world challenge of disjointed student records,
                manual paper-based registration, and siloed academic reporting. It delivers
                an enterprise-grade solution adhering to strict REST architectural principles,
                sanitized MongoDB queries, and structured React state management.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
                <div>
                  <p className="font-semibold text-white">Frontend Engine</p>
                  <p className="text-indigo-200">React 18 + Vite + Tailwind</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Backend Framework</p>
                  <p className="text-indigo-200">Express 4.21 + Node.js 24</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Database Layer</p>
                  <p className="text-indigo-200">MongoDB + Mongoose ODM</p>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all"
                >
                  Test Demo Login <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Academic Project Demonstration
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Ready to test all CRUD functions and evaluate database schemas? Launch the dashboard
            or sign up with your college email.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-sm"
            >
              Register Faculty Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

