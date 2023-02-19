import client from "../database";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class storeUsers {
  async getAllUsers(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get Users. Error:${error}`);
    }
  }

  async getUserByID(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=$1 ;";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get User with id=${id}. Error:${error}`);
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *;";
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.password,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not create User with name:${user.firstName} ${user.lastName}. Error:${error}`
      );
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4 RETURNING *;";
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.password,
        user.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not update User with id = ${user.id}. Error:${error}`
      );
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not delete User with id = ${id}. Error:${error}`);
    }
  }
}
