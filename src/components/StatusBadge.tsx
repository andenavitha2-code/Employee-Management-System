import type { EmployeeStatus } from '../types/employee';

export default function StatusBadge({ status }: { status: EmployeeStatus }) {
  const styles =
    status === 'Active'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-rose-100 text-rose-700';

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
