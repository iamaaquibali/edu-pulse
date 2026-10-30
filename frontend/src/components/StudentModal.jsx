import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, AlertCircle } from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics & Comm.',
  'Mechanical Eng.',
  'Electrical Eng.',
  'Civil Eng.',
  'Data Science',
  'Business Administration',
];

const STATUSES = ['Active', 'Inactive', 'Graduated', 'Suspended'];

export const StudentModal = ({ isOpen, onClose, onSave, student = null, loading = false }) => {
  const isEditing = Boolean(student);

  const initialForm = {
    fullName: '',
    rollNumber: '',
    email: '',
    department: 'Computer Science',
    semester: 1,
    cgpa: '',
    status: 'Active',
    phone: '',
    gender: 'Male',
    dateOfBirth: '',
    guardianName: '',
    guardianPhone: '',
    address: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName || '',
        rollNumber: student.rollNumber || '',
        email: student.email || '',
        department: student.department || 'Computer Science',
        semester: student.semester || 1,
        cgpa: student.cgpa !== undefined ? student.cgpa : '',
        status: student.status || 'Active',
        phone: student.phone || '',
        gender: student.gender || 'Male',
        dateOfBirth: student.dateOfBirth
          ? new Date(student.dateOfBirth).toISOString().split('T')[0]
          : '',
        guardianName: student.guardianName || '',
        guardianPhone: student.guardianPhone || '',
        address: student.address || '',
      });
    } else {
      setFormData(initialForm);
    }
    setErrors({});
  }, [student, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.cgpa === '' || isNaN(formData.cgpa)) {
      newErrors.cgpa = 'CGPA is required';
    } else {
      const val = parseFloat(formData.cgpa);
      if (val < 0 || val > 10) newErrors.cgpa = 'CGPA must be between 0.0 and 10.0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              {isEditing ? <Save className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {isEditing ? 'Update Student Record' : 'Enroll New Student'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEditing ? `Editing record for ${student.fullName}` : 'Fill in the student academic and personal details'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                  errors.fullName ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="e.g. Rahul Sharma"
              />
              {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Roll / Reg Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border ${
                  errors.rollNumber ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="e.g. CS2023001"
              />
              {errors.rollNumber && <p className="text-xs text-rose-500 mt-1">{errors.rollNumber}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                  errors.email ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="e.g. rahul.sharma@college.edu"
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                  errors.phone ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="e.g. +91 98765 43210"
              />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Semester <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* CGPA */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CGPA (0.00 - 10.00) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                  errors.cgpa ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="e.g. 8.75"
              />
              {errors.cgpa && <p className="text-xs text-rose-500 mt-1">{errors.cgpa}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enrollment Status <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Guardian Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Guardian / Parent Name
              </label>
              <input
                type="text"
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Ramesh Sharma"
              />
            </div>

            {/* Guardian Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Guardian Phone
              </label>
              <input
                type="text"
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. +91 98765 00000"
              />
            </div>
          </div>

          {/* Residential Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Residential Address
            </label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 124 Park Avenue, City, State"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition-all disabled:opacity-60"
            >
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {isEditing ? 'Save Changes' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

