import { useState } from 'react';

function SignUpValidation(values) {
  const [errors, setErrors] = useState({});

  const fields = [
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
    {
      field: 'password',
      label: 'Password',
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message: 'Password must contain at least one number, one lowercase and one uppercase letter, and be at least 8 characters long',
    },
    { field: 'roleId', label: 'User Role', pattern: /^[0-9]+$/, message: 'Role ID should be a valid number' },
  ];

  fields.forEach(({ field, label, pattern, message }) => {
    if (!values[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: `${label} should not be empty` }));
    } else if (pattern && !pattern.test(values[field])) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: message }));
    } else {
      // Clear the error message if the field is valid
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  });

  return errors;
}

export default SignUpValidation;
