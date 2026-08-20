import { useEffect, useMemo, useState } from 'react';
import type { Employee, EmployeeFormData } from './types/employee';
import { employeeApi } from './api/employeeApi';
import DashboardCards from './components/DashboardCards';
import SearchFilterBar from './components/SearchFilterBar';
import type { FilterState } from './components/SearchFilterBar';
import EmployeeList from './components/EmployeeList';
import EmployeeFormModal from './components/EmployeeFormModal';
import EmployeeDetailsModal from './components/EmployeeDetailsModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import type { ToastMessage } from './components/Toast';

type ModalState =
  | { type: 'none' }
  | { type: 'add' }
  | { type: 'edit'; employee: Employee }
  | { type: 'view'; employee: Employee }
  | { type: 'delete'; employee: Employee };

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    department: '',
    status: '',
    sortByJoiningDate: 'none',
  });

  function pushToast(text: string, type: ToastMessage['type'] = 'success') {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  async function loadEmployees() {
    setLoading(true);
    setError('');
    try {
      const data = await employeeApi.getAll();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError(
        'Could not reach the mock backend. Make sure JSON Server is running (npm run server) on http://localhost:5000.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(
        (e) => e.fullName.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)
      );
    }

    if (filters.department) {
      result = result.filter((e) => e.department === filters.department);
    }

    if (filters.status) {
      result = result.filter((e) => e.status === filters.status);
    }

    if (filters.sortByJoiningDate !== 'none') {
      result.sort((a, b) => {
        const diff = new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime();
        return filters.sortByJoiningDate === 'asc' ? diff : -diff;
      });
    }

    return result;
  }, [employees, filters]);

  async function handleAddSubmit(data: EmployeeFormData) {
    const created = await employeeApi.create(data);
    setEmployees((prev) => [...prev, created]);
    setModal({ type: 'none' });
    pushToast('Employee added successfully');
  }

  async function handleEditSubmit(id: string, data: EmployeeFormData) {
    const updated = await employeeApi.update(id, data);
    setEmployees((prev) => prev.map((e) => (e.id === id ? updated : e)));
    setModal({ type: 'none' });
    pushToast('Employee updated successfully');
  }

  async function handleDelete(employee: Employee) {
    await employeeApi.remove(employee.id);
    setEmployees((prev) => prev.filter((e) => e.id !== employee.id));
    setModal({ type: 'none' });
    pushToast('Employee deleted successfully');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl font-bold text-slate-800">Employee Management System</h1>
          <p className="text-sm text-slate-500">Manage your organization's workforce</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <DashboardCards employees={employees} />

        <SearchFilterBar
          filters={filters}
          onChange={setFilters}
          onAddClick={() => setModal({ type: 'add' })}
        />

        <EmployeeList
          employees={filteredEmployees}
          loading={loading}
          onView={(emp) => setModal({ type: 'view', employee: emp })}
          onEdit={(emp) => setModal({ type: 'edit', employee: emp })}
          onDelete={(emp) => setModal({ type: 'delete', employee: emp })}
        />
      </main>

      {modal.type === 'add' && (
        <EmployeeFormModal onClose={() => setModal({ type: 'none' })} onSubmit={handleAddSubmit} />
      )}

      {modal.type === 'edit' && (
        <EmployeeFormModal
          employee={modal.employee}
          onClose={() => setModal({ type: 'none' })}
          onSubmit={(data) => handleEditSubmit(modal.employee.id, data)}
        />
      )}

      {modal.type === 'view' && (
        <EmployeeDetailsModal
          employee={modal.employee}
          onClose={() => setModal({ type: 'none' })}
          onEdit={() => setModal({ type: 'edit', employee: modal.employee })}
        />
      )}

      {modal.type === 'delete' && (
        <DeleteConfirmModal
          employee={modal.employee}
          onClose={() => setModal({ type: 'none' })}
          onConfirm={() => handleDelete(modal.employee)}
        />
      )}

      <Toast toasts={toasts} />
    </div>
  );
}
