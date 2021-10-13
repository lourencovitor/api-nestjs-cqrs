import * as bcrypt from 'bcrypt';

export const isMatch = async (passcode: string, password: string) => {
  return await bcrypt.compare(passcode, password);
};

export const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};