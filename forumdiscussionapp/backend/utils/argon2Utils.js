import argon2 from 'argon2';
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ,
  transports: [
    new winston.transports.Console(),
  ],
});

const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password, {
      timeCost: parseInt(process.env.ARGON2_TIME_COST) ,
      memoryCost: parseInt(process.env.ARGON2_MEMORY_COST) ,
      parallelism: parseInt(process.env.ARGON2_PARALLELISM) ,
    });

    logger.info('Password hashed successfully');
    return hashedPassword;
  } catch (error) {
    logger.error('Error hashing password:', error);
    throw error; // Propagate the error
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    if (!hashedPassword) {
      logger.warn('No hashed password provided for verification');
      return false;
    }

    const isPasswordValid = await argon2.verify(hashedPassword, password);

    logger.info('Password verification result:', isPasswordValid);
    return isPasswordValid;
  } catch (error) {
    logger.error('Error verifying password:', error);
    throw error; // Propagate the error
  }
};

export { hashPassword, verifyPassword };
