import type { Employee } from '../types/employee';

interface DashboardCardsProps {
  employees: Employee[];
}

export default function DashboardCards({ employees }: DashboardCardsProps) {
  const total = employees.length;
  const active = employees.filter((e) => e.status === 'Active').length;
  const inactive = employees.filter((e) => e.status === 'Inactive').length;
  const departments = new Set(employees.map((e) => e.department)).size;

  const cards = [
    {
      label: 'Total Employees',
      value: total,
      accent: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
      dot: 'bg-indigo-500',
    },
    {
      label: 'Active Employees',
      value: active,
      accent: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
      dot: 'bg-emerald-500',
    },
    {
      label: 'Inactive Employees',
      value: inactive,
      accent: 'bg-rose-50 text-rose-700 ring-rose-200',
      dot: 'bg-rose-500',
    },
    {
      label: 'Departments',
      value: departments,
      accent: 'bg-amber-50 text-amber-700 ring-amber-200',
      dot: 'bg-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl ring-1 p-5 shadow-sm ${card.accent} bg-white`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`h-2.5 w-2.5 rounded-full ${card.dot}`} />
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
          </div>
          <p className="text-3xl font-bold text-slate-800">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
