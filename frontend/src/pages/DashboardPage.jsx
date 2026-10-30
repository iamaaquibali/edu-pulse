import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { StudentModal } from '../components/StudentModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { StudentDetailModal } from '../components/StudentDetailModal';
import api from '../services/api';
import {
  Users,
  UserCheck,
  Award,
  Building,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  BookOpen,
  Eye,
  Edit2,
  Trash2,
  Activity,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal states for Quick Actions directly from Dashboard
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStudent, setModalStudent] = useState(null);
  const [detailStudent, setDetailStudent] = useState(null);
  const [deleteStudentTarget, setDeleteStudentTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get('/dashboard/stats');
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      setError('Failed to fetch dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Save student (create or update from dashboard)
  const handleSaveStudent = async (formData) => {
    setActionLoading(true);
    try {
      if (modalStudent) {
        await api.put(`/students/${modalStudent._id}`, formData);
      } else {
        await api.post('/students', formData);
      }
      setIsModalOpen(false);
      setModalStudent(null);
      fetchStats();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save student record');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete student
  const handleDeleteStudent = async () => {
    if (!deleteStudentTarget) return;
    setActionLoading(true);
    try {
      await api.delete(`/students/${deleteStudentTarget._id}`);
      setDeleteStudentTarget(null);
      fetchStats();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete student record');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Welcome back, {user?.name || 'Faculty Member'}! 👋
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Role: <span className="font-semibold text-indigo-600">{user?.role}</span> • Department:{' '}
                <span className="font-semibold text-slate-700">{user?.department}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchStats}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Refresh Analytics"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => {
                  setModalStudent(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                Enroll New Student
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Students */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Students
                </span>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mt-3">
                {stats?.totalStudents ?? (loading ? '...' : 0)}
              </p>
              <p className="text-xs text-indigo-600 font-medium mt-1 flex items-center gap-1">
                <span>Synchronized with MongoDB</span>
              </p>
            </div>

            {/* Active Students */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Active Enrollment
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mt-3">
                {stats?.activeStudents ?? (loading ? '...' : 0)}
              </p>
              <p className="text-xs text-emerald-600 font-medium mt-1">
                {stats?.totalStudents
                  ? `${Math.round((stats.activeStudents / stats.totalStudents) * 100)}% of student body`
                  : 'Currently enrolled'}
              </p>
            </div>

            {/* Average CGPA */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Average CGPA
                </span>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mt-3">
                {stats?.avgCgpa ? `${stats.avgCgpa} / 10` : (loading ? '...' : '0.00')}
              </p>
              <p className="text-xs text-amber-600 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Aggregated Across Departments</span>
              </p>
            </div>

            {/* Total Departments */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Active Departments
                </span>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mt-3">
                {stats?.departmentDistribution?.length ?? (loading ? '...' : 0)}
              </p>
              <p className="text-xs text-sky-600 font-medium mt-1">
                Academic disciplines managed
              </p>
            </div>
          </div>

          {/* Department Breakdown Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Department Enrollment & Average CGPA
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats?.departmentDistribution?.map((dept) => (
                <div
                  key={dept.department}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-indigo-100 transition-all"
                >
                  <p className="font-semibold text-xs text-slate-800 truncate">
                    {dept.department}
                  </p>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl font-bold text-indigo-600">{dept.count}</span>
                    <span className="text-xs text-slate-500 font-mono">
                      Avg: {dept.avgCgpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Grid: Recent Students & Recent Activity Log */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Students Table (2 Columns) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    Recent Student Enrollments
                  </h3>
                  <p className="text-xs text-slate-400">
                    Latest records added to the MongoDB database
                  </p>
                </div>
                <Link
                  to="/students"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  <span>View All Records</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/75 text-slate-400 font-semibold uppercase border-b border-slate-100">
                    <tr>
                      <th className="px-5 py-3">Student</th>
                      <th className="px-5 py-3">Department</th>
                      <th className="px-5 py-3">CGPA</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats?.recentStudents?.map((stu) => (
                      <tr key={stu._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-slate-800">{stu.fullName}</p>
                          <p className="text-[11px] font-mono text-slate-400">{stu.rollNumber}</p>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">{stu.department}</td>
                        <td className="px-5 py-3.5">
                          <span className="font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            {stu.cgpa.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              stu.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {stu.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => setDetailStudent(stu)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="View Record"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setModalStudent(stu);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Edit Record"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteStudentTarget(stu)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {(!stats?.recentStudents || stats.recentStudents.length === 0) && (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-slate-400">
                          No student records found. Click "Enroll New Student" to add records.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Audit Activities (1 Column) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  System Audit Logs
                </h3>
                <span className="text-[11px] text-slate-400">Real-time</span>
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {stats?.recentActivities?.map((act, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 text-xs"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-slate-800 leading-snug">
                        {act.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span>{act.userName}</span>
                        <span>•</span>
                        <span>
                          {act.createdAt
                            ? new Date(act.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'Just now'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {(!stats?.recentActivities || stats.recentActivities.length === 0) && (
                  <p className="text-xs text-slate-400 text-center py-6">
                    No activity logs recorded yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalStudent(null);
        }}
        onSave={handleSaveStudent}
        student={modalStudent}
        loading={actionLoading}
      />

      <StudentDetailModal
        isOpen={Boolean(detailStudent)}
        onClose={() => setDetailStudent(null)}
        student={detailStudent}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteStudentTarget)}
        onClose={() => setDeleteStudentTarget(null)}
        onConfirm={handleDeleteStudent}
        student={deleteStudentTarget}
        loading={actionLoading}
      />
    </div>
  );
};

