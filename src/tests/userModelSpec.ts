import { User, storeUsers } from "../models/users";
import client from "../database";

const userAgent = new storeUsers();

describe("testing user model CRUD operations", (): void => {
  const user: User = {
    firstName: "testname",
    lastName: "testlastname",
    password: "testpassword",
  };

  afterAll(async (): Promise<void> => {
    const conn = await client.connect();
    const sql = "DELETE FROM users;";
    const sql2 = "ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql);
    await conn.query(sql2);
    conn.release();
  });

  it("testing create method existance", async (): Promise<void> => {
    expect(userAgent.createUser).toBeDefined();
  });

  it("testing get all method existance", async (): Promise<void> => {
    expect(userAgent.getAllUsers).toBeDefined();
  });

  it("testing get by ID method existance", async (): Promise<void> => {
    expect(userAgent.getUserByID).toBeDefined();
  });

  it("testing delete method existance", async (): Promise<void> => {
    expect(userAgent.deleteUser).toBeDefined();
  });

  it("testing update method existance", async (): Promise<void> => {
    expect(userAgent.updateUser).toBeDefined();
  });

  it("testing create method functionality", async (): Promise<void> => {
    const newUser: User = await userAgent.createUser(user);

    expect(newUser.firstName === user.firstName).toBeTrue;
  });

  it("testing update method functionality", async (): Promise<void> => {
    const updatedUser: User = await userAgent.updateUser({
      firstName: "updatedfirstname",
      lastName: "updatedlastname",
      password: "passwordtest",
      id: 1,
    });

    expect(user.firstName === updatedUser.firstName).toBeFalse;
  });

  it("testing delete method functionality", async (): Promise<void> => {
    const deletedUser: User = await userAgent.deleteUser(1);

    const user: User[] = await userAgent.getAllUsers();

    expect(user).toBeNull;
  });
});
