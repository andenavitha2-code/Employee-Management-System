import type { Employee } from '../types/employee';
import Modal from './Modal';
import StatusBadge from './StatusBadge';

interface EmployeeDetailsModalProps {
  employee: Employee;
  onClose: () => void;
  onEdit: () => void;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}

export default function EmployeeDetailsModal({ employee, onClose, onEdit }: EmployeeDetailsModalProps) {
  const initials = employee.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Modal title="Employee Details" onClose={onClose}>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-14 w-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-lg">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-slate-800">{employee.fullName}</p>
          <p className="text-sm text-slate-500">{employee.role}</p>
        </div>
      </div>

      <div>
        <Row label="Email" value={employee.email} />
        <Row label="Phone" value={employee.phone} />
        <Row label="Department" value={employee.department} />
        <Row label="Role" value={employee.role} />
        <Row label="Joining Date" value={employee.joiningDate} />
        <Row label="Status" value={<StatusBadge status={employee.status} />} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Close
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Edit Employee
        </button>
      </div>
    </Modal>
  );
}
