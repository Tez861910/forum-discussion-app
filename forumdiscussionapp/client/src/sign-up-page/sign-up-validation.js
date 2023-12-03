function SignUpValidation(values) {
  const errors = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const fields = [
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email', pattern: emailPattern, message: 'Invalid email format' },
    {
      field: 'password',
      label: 'Password',
      pattern: passwordPattern,
      message: 'Password must contain at least one number, one lowercase and one uppercase letter, and be at least 8 characters long',
    },
    { field: 'roleId', label: 'User Role', pattern: /^[0-9]+$/, message: 'Role ID should be a valid number' },
    { field: 'courseId', label: 'User Course', pattern: /^[0-9]+$/, message: 'Course ID should be a valid number' },
  ];

  fields.forEach(({ field, label, pattern, message }) => {
    if (!values[field]) {
      errors[field] = `${label} should not be empty`;
    } else if (pattern && !pattern.test(values[field])) {
      errors[field] = message;
    } else {
      // Clear the error message if the field is valid
      delete errors[field];
    }
  });

  return errors;
}

export default SignUpValidation;
