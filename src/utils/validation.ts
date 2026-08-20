import type { EmployeeFormData, EmployeeFormErrors } from '../types/employee';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;

export function validateEmployeeForm(data: EmployeeFormData): EmployeeFormErrors {
  const errors: EmployeeFormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Phone number must be exactly 10 digits';
  }

  if (!data.department.trim()) {
    errors.department = 'Department is required';
  }

  if (!data.role.trim()) {
    errors.role = 'Role is required';
  }

  if (!data.joiningDate.trim()) {
    errors.joiningDate = 'Joining date is required';
  } else {
    const selected = new Date(data.joiningDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected > today) {
      errors.joiningDate = 'Joining date cannot be in the future';
    }
  }

  if (!data.status) {
    errors.status = 'Status is required';
  }

  return errors;
}

export function hasErrors(errors: EmployeeFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
