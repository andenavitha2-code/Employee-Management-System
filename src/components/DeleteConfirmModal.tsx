import { useState } from 'react';
import type { Employee } from '../types/employee';
import Modal from './Modal';

interface DeleteConfirmModalProps {
  employee: Employee;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmModal({ employee, onClose, onConfirm }: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Modal title="Delete Employee" onClose={onClose} maxWidth="max-w-sm">
      <p className="text-sm text-slate-600">
        Are you sure you want to delete <span className="font-semibold text-slate-800">{employee.fullName}</span>?
        This action cannot be undone.
      </p>
      <div className="flex justify-end gap-2 pt-5">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={deleting}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-60"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  );
}
