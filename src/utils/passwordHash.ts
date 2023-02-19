import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const pepper: string = process.env.PEPPER as string;
const saltRounds: number = parseInt(
  process.env.SALT_ROUNDS as string
) as number;

const passwordHashing = (password: string): string => {
  const hash: string = bcrypt.hashSync(password + pepper, saltRounds);
  return hash;
};

export default passwordHashing;
