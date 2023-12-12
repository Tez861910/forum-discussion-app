function SignUpValidation(values) {
  const errors = {};

  const fields = [
    { field: 'name', label: 'User Name' },
    { field: 'email', label: 'User Email', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
    {
      field: 'password',
      label: 'Password',
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message: 'Password must contain at least one number, one lowercase and one uppercase letter, and be at least 8 characters long',
    },
    { field: 'address', label: 'Address' },
    { field: 'phoneNumber', label: 'Phone Number' },
    { field: 'dateOfBirth', label: 'Date of Birth' },
    { field: 'gender', label: 'Gender' },
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
