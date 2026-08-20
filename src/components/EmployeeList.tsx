import type { Employee } from '../types/employee';
import StatusBadge from './StatusBadge';

interface EmployeeListProps {
  employees: Employee[];
  loading: boolean;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export default function EmployeeList({ employees, loading, onView, onEdit, onDelete }: EmployeeListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-10 text-center text-slate-500">
        Loading employees...
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-10 text-center text-slate-500">
        No employees found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Department</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Joining Date</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                <td
                  className="px-4 py-3 font-medium text-slate-800 cursor-pointer hover:text-indigo-600"
                  onClick={() => onView(emp)}
                >
                  {emp.fullName}
                </td>
                <td className="px-4 py-3 text-slate-600">{emp.email}</td>
                <td className="px-4 py-3 text-slate-600">{emp.phone}</td>
                <td className="px-4 py-3 text-slate-600">{emp.department}</td>
                <td className="px-4 py-3 text-slate-600">{emp.role}</td>
                <td className="px-4 py-3 text-slate-600">{emp.joiningDate}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={emp.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onView(emp)}
                      className="px-2.5 py-1.5 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(emp)}
                      className="px-2.5 py-1.5 text-xs rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(emp)}
                      className="px-2.5 py-1.5 text-xs rounded-md bg-rose-100 text-rose-700 hover:bg-rose-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-slate-100">
        {employees.map((emp) => (
          <div key={emp.id} className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-800">{emp.fullName}</p>
                <p className="text-xs text-slate-500">{emp.role} · {emp.department}</p>
              </div>
              <StatusBadge status={emp.status} />
            </div>
            <p className="text-sm text-slate-600">{emp.email}</p>
            <p className="text-sm text-slate-600">{emp.phone}</p>
            <p className="text-xs text-slate-500">Joined: {emp.joiningDate}</p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onView(emp)}
                className="flex-1 px-2.5 py-1.5 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                View
              </button>
              <button
                onClick={() => onEdit(emp)}
                className="flex-1 px-2.5 py-1.5 text-xs rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(emp)}
                className="flex-1 px-2.5 py-1.5 text-xs rounded-md bg-rose-100 text-rose-700 hover:bg-rose-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
