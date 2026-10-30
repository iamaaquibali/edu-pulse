import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { StudentModal } from '../components/StudentModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { StudentDetailModal } from '../components/StudentDetailModal';
import api from '../services/api';
import {
  Users,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Edit2,
  Trash2,
  Download,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

const DEPARTMENTS = [
  'All',
  'Computer Science',
  'Information Technology',
  'Electronics & Comm.',
  'Mechanical Eng.',
  'Electrical Eng.',
  'Civil Eng.',
  'Data Science',
  'Business Administration',
];

const STATUSES = ['All', 'Active', 'Inactive', 'Graduated', 'Suspended'];

export const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [semester, setSemester] = useState('All');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStudent, setModalStudent] = useState(null);
  const [detailStudent, setDetailStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        search: search.trim() || undefined,
        department: department !== 'All' ? department : undefined,
        semester: semester !== 'All' ? semester : undefined,
        status: status !== 'All' ? status : undefined,
        sortBy,
        order,
        page,
        limit: 10,
      };

      const res = await api.get('/students', { params });
      if (res.data.success) {
        setStudents(res.data.students);
        setTotalPages(res.data.totalPages);
        setTotalCount(res.data.total);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch student records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, department, semester, status, sortBy, order, page]);

  // Handle Save (Create or Update)
  const handleSaveStudent = async (formData) => {
    setActionLoading(true);
    try {
      if (modalStudent) {
        await api.put(`/students/${modalStudent._id}`, formData);
        setSuccessMsg(`Student '${formData.fullName}' updated successfully.`);
      } else {
        await api.post('/students', formData);
        setSuccessMsg(`Student '${formData.fullName}' enrolled successfully.`);
      }
      setIsModalOpen(false);
      setModalStudent(null);
      fetchStudents();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save student record');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Delete
  const handleDeleteStudent = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      await api.delete(`/students/${deleteTarget._id}`);
      setSuccessMsg(`Student '${deleteTarget.fullName}' deleted successfully.`);
      setDeleteTarget(null);
      fetchStudents();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete student record');
    } finally {
      setActionLoading(false);
    }
  };

  // Export records as CSV
  const handleExportCSV = () => {
    if (students.length === 0) return;
    const headers = ['Roll Number', 'Full Name', 'Email', 'Department', 'Semester', 'CGPA', 'Status', 'Phone'];
    const rows = students.map((s) => [
      s.rollNumber,
      `"${s.fullName}"`,
      s.email,
      `"${s.department}"`,
      s.semester,
      s.cgpa,
      s.status,
      s.phone,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Graduated':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Suspended':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2.5">
                <Users className="w-6 h-6 text-indigo-600" />
                Student Records Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Full CRUD management of student academic and personal profiles ({totalCount} total documents)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 text-slate-500" />
                Export CSV
              </button>
              <button
                onClick={() => {
                  setModalStudent(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                Add Student
              </button>
            </div>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
              {successMsg}
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search Bar */}
              <div className="lg:col-span-2 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search name, roll number, or email..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Departments</option>
                  {DEPARTMENTS.filter((d) => d !== 'All').map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester Filter */}
              <div>
                <select
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Semesters</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Statuses</option>
                  {STATUSES.filter((s) => s !== 'All').map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 px-2 py-1 rounded border border-slate-200 font-medium text-slate-700"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="cgpa">CGPA Score</option>
                  <option value="fullName">Full Name</option>
                  <option value="rollNumber">Roll Number</option>
                </select>
                <button
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  className="px-2 py-1 rounded bg-slate-50 border border-slate-200 font-medium hover:bg-slate-100"
                >
                  {order === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
                </button>
              </div>

              <div>
                Showing <span className="font-semibold text-slate-800">{students.length}</span> of{' '}
                <span className="font-semibold text-slate-800">{totalCount}</span> records
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/75 text-slate-500 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Roll No</th>
                    <th className="px-5 py-3.5">Student Name</th>
                    <th className="px-5 py-3.5">Department</th>
                    <th className="px-5 py-3.5">Semester</th>
                    <th className="px-5 py-3.5">CGPA</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      <td className="px-5 py-3.5 font-mono font-semibold text-indigo-700">
                        {student.rollNumber}
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-slate-800">{student.fullName}</p>
                        <p className="text-xs text-slate-400">{student.email}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">
                        {student.department}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-slate-700">
                        Sem {student.semester}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-mono font-bold text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded border border-indigo-100">
                          {student.cgpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setDetailStudent(student)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setModalStudent(student);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit Student"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(student)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {loading && (
                    <tr>
                      <td colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-slate-500 font-medium">
                            Fetching MongoDB records...
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}

                  {!loading && students.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-slate-400">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                            <Users className="w-6 h-6" />
                          </div>
                          <p className="font-semibold text-slate-700 text-sm">
                            No student records found
                          </p>
                          <p className="text-xs text-slate-400 max-w-xs">
                            Try adjusting your search criteria or enroll a new student to get started.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>
                  Page <strong className="text-slate-800">{page}</strong> of{' '}
                  <strong className="text-slate-800">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
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
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteStudent}
        student={deleteTarget}
        loading={actionLoading}
      />
    </div>
  );
};

