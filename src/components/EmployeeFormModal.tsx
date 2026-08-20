import { useState } from 'react';
import type { Employee, EmployeeFormData, EmployeeFormErrors } from '../types/employee';
import { DEPARTMENTS } from '../types/employee';
import { validateEmployeeForm, hasErrors } from '../utils/validation';
import Modal from './Modal';

interface EmployeeFormModalProps {
  employee?: Employee | null; // if present -> edit mode
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
}

const emptyForm: EmployeeFormData = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  role: '',
  joiningDate: '',
  status: 'Active',
};

export default function EmployeeFormModal({ employee, onClose, onSubmit }: EmployeeFormModalProps) {
  const isEdit = !!employee;
  const [form, setForm] = useState<EmployeeFormData>(
    employee
      ? {
          fullName: employee.fullName,
          email: employee.email,
          phone: employee.phone,
          department: employee.department,
          role: employee.role,
          joiningDate: employee.joiningDate,
          status: employee.status,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState<EmployeeFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleChange<K extends keyof EmployeeFormData>(field: K, value: EmployeeFormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateEmployeeForm(form);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit(form);
    } catch (err) {
      setSubmitError('Something went wrong while saving. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (hasError?: string) =>
    `w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
      hasError ? 'border-rose-400 focus:ring-rose-300' : 'border-slate-300 focus:ring-indigo-400'
    }`;

  return (
    <Modal title={isEdit ? 'Edit Employee' : 'Add Employee'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={inputClass(errors.fullName)}
            placeholder="e.g. Ananya Sharma"
          />
          {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClass(errors.email)}
            placeholder="e.g. ananya@company.com"
          />
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={inputClass(errors.phone)}
            placeholder="10-digit phone number"
          />
          {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select
              value={form.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className={inputClass(errors.department)}
            >
              <option value="">Select</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.department && <p className="text-xs text-rose-500 mt-1">{errors.department}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className={inputClass(errors.role)}
              placeholder="e.g. Developer"
            />
            {errors.role && <p className="text-xs text-rose-500 mt-1">{errors.role}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Joining Date</label>
            <input
              type="date"
              value={form.joiningDate}
              onChange={(e) => handleChange('joiningDate', e.target.value)}
              className={inputClass(errors.joiningDate)}
            />
            {errors.joiningDate && <p className="text-xs text-rose-500 mt-1">{errors.joiningDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value as EmployeeFormData['status'])}
              className={inputClass(errors.status)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {submitError && <p className="text-sm text-rose-500">{submitError}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
