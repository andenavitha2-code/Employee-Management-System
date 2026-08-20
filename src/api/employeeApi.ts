import axiosClient from './axiosClient';
import type { Employee, EmployeeFormData } from '../types/employee';

const RESOURCE = '/employees';

export const employeeApi = {
  // READ - get all employees
  getAll: async (): Promise<Employee[]> => {
    const res = await axiosClient.get<Employee[]>(RESOURCE);
    return res.data;
  },

  // READ - get single employee by id
  getById: async (id: string): Promise<Employee> => {
    const res = await axiosClient.get<Employee>(`${RESOURCE}/${id}`);
    return res.data;
  },

  // CREATE - add new employee
  create: async (data: EmployeeFormData): Promise<Employee> => {
    const res = await axiosClient.post<Employee>(RESOURCE, data);
    return res.data;
  },

  // UPDATE - full update of an employee
  update: async (id: string, data: EmployeeFormData): Promise<Employee> => {
    const res = await axiosClient.put<Employee>(`${RESOURCE}/${id}`, data);
    return res.data;
  },

  // DELETE - remove employee
  remove: async (id: string): Promise<void> => {
    await axiosClient.delete(`${RESOURCE}/${id}`);
  },
};
