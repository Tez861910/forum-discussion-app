function SignUpValidation(values) {
  const errors = {};

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
      errors[field] = `${label} should not be empty`;
    } else if (pattern && !pattern.test(values[field])) {
      errors[field] = message;
    }
  });

  return errors;
}

export default SignUpValidation;

