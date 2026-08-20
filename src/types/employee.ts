export type EmployeeStatus = 'Active' | 'Inactive';

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  joiningDate: string; // YYYY-MM-DD
  status: EmployeeStatus;
}

export type EmployeeFormData = Omit<Employee, 'id'>;

export const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Sales',
  'Marketing',
  'Finance',
  'Operations',
  'Customer Support',
] as const;

export interface EmployeeFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  department?: string;
  role?: string;
  joiningDate?: string;
  status?: string;
}
