import React from 'react';
import {
  X,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  Award,
  BookOpen,
} from 'lucide-react';

export const StudentDetailModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  const statusColors = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-100 text-slate-700 border-slate-300',
    Graduated: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Suspended: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 px-6 py-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
              {student.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{student.fullName}</h3>
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full border bg-white/20 text-white`}
                >
                  {student.status}
                </span>
              </div>
              <p className="text-indigo-100 text-sm font-mono mt-0.5">
                Roll: {student.rollNumber}
              </p>
              <p className="text-xs text-indigo-200 mt-1 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> {student.department} • Semester {student.semester}
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Academic Highlights */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-indigo-50/60 rounded-xl p-3 border border-indigo-100/60">
              <span className="block text-xs font-medium text-slate-500">CGPA</span>
              <span className="text-lg font-bold text-indigo-700 flex items-center justify-center gap-1">
                <Award className="w-4 h-4 text-amber-500" />
                {student.cgpa.toFixed(2)}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <span className="block text-xs font-medium text-slate-500">Semester</span>
              <span className="text-lg font-bold text-slate-800">
                Sem {student.semester}
              </span>
            </div>
            <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100/60">
              <span className="block text-xs font-medium text-slate-500">Status</span>
              <span className="text-sm font-bold text-emerald-700 mt-0.5 block">
                {student.status}
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Contact & Personal Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <div className="truncate">
                  <p className="text-[11px] text-slate-400">Email Address</p>
                  <p className="font-medium text-slate-700 truncate">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <div className="truncate">
                  <p className="text-[11px] text-slate-400">Phone</p>
                  <p className="font-medium text-slate-700 truncate">{student.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">Date of Birth</p>
                  <p className="font-medium text-slate-700">
                    {student.dateOfBirth
                      ? new Date(student.dateOfBirth).toLocaleDateString()
                      : 'Not specified'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <User className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">Gender</p>
                  <p className="font-medium text-slate-700">{student.gender || 'Male'}</p>
                </div>
              </div>
            </div>

            {student.address && (
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-sm">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-slate-400">Address</p>
                  <p className="font-medium text-slate-700">{student.address}</p>
                </div>
              </div>
            )}
          </div>

          {/* Guardian Information */}
          {(student.guardianName || student.guardianPhone) && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Guardian Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[11px] text-slate-400">Guardian Name</p>
                  <p className="font-medium text-slate-700">
                    {student.guardianName || 'N/A'}
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[11px] text-slate-400">Guardian Contact</p>
                  <p className="font-medium text-slate-700">
                    {student.guardianPhone || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Audit Metadata */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span>
              Recorded By:{' '}
              <strong className="text-slate-600">
                {student.createdBy?.name || 'System Faculty'}
              </strong>
            </span>
            <span>
              Enrolled: {new Date(student.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

