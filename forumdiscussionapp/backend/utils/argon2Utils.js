const argon2 = require('argon2');

const hashPassword = async (password) => {
  const hashedPassword = await argon2.hash(password);
  console.log('Password hashed successfully');
  return hashedPassword;
}

const verifyPassword = async (password, hashedPassword) => {
  if (!hashedPassword) {
    console.log('No hashed password provided for verification');
    return false;
  }
  const isPasswordValid = await argon2.verify(hashedPassword, password);
  console.log('Password verification result:', isPasswordValid);
  return isPasswordValid;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
