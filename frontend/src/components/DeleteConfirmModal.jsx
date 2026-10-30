import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, student, loading }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-inner">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-2">
            Confirm Record Deletion
          </h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Are you sure you want to permanently delete student{' '}
            <strong className="text-slate-800 font-semibold">{student.fullName}</strong>{' '}
            (Roll: <span className="font-mono text-indigo-600 font-semibold">{student.rollNumber}</span>)?
            This action cannot be undone.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md shadow-rose-200 transition-all disabled:opacity-60"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

