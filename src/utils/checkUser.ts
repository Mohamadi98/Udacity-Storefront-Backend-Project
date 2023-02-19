import { storeUsers, User } from "../models/users";

const userAgent = new storeUsers();

const checkUserExist = async (id: number): Promise<Boolean> => {
  const result: User = await userAgent.getUserByID(id);
  if (result == null) {
    return false;
  }
  return true;
};

export default checkUserExist;
