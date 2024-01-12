import argon2 from "argon2";
import config from "../config.js";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password, {
      timeCost: parseInt(config.ARGON2_TIME_COST),
      memoryCost: parseInt(config.ARGON2_MEMORY_COST),
      parallelism: parseInt(config.ARGON2_PARALLELISM),
    });

    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Error while hashing password");
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    if (!hashedPassword) {
      return false;
    }

    const isPasswordValid = await argon2.verify(hashedPassword, password);

    return isPasswordValid;
  } catch (error) {
    console.error(error);
    throw new Error("Error while verifying password");
  }
};
