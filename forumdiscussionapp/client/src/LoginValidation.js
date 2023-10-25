// LoginValidation.js
function LoginValidation(values) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}/;

  if (!values.email) {
    errors.email = 'Email should not be empty';
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.password) {
    errors.password = 'Password should not be empty';
  } else if (!passwordPattern.test(values.password)) {
    errors.password = 'Password must contain at least one number, one lowercase letter, one uppercase letter, and be at least 8 characters long';
  }

  return errors;
}


export default LoginValidation;
