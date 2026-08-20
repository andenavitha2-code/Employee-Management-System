import { DEPARTMENTS } from '../types/employee';

export interface FilterState {
  search: string;
  department: string;
  status: string;
  sortByJoiningDate: 'none' | 'asc' | 'desc';
}

interface SearchFilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onAddClick: () => void;
}

export default function SearchFilterBar({ filters, onChange, onAddClick }: SearchFilterBarProps) {
  return (
    <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full sm:w-64 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          value={filters.department}
          onChange={(e) => onChange({ ...filters, department: e.target.value })}
          className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={filters.sortByJoiningDate}
          onChange={(e) =>
            onChange({ ...filters, sortByJoiningDate: e.target.value as FilterState['sortByJoiningDate'] })
          }
          className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="none">Sort: Joining Date</option>
          <option value="asc">Joining Date ↑ (Oldest)</option>
          <option value="desc">Joining Date ↓ (Newest)</option>
        </select>
      </div>

      <button
        onClick={onAddClick}
        className="whitespace-nowrap px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
      >
        + Add Employee
      </button>
    </div>
  );
}
