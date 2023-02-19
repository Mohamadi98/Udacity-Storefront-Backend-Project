import client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  product_id: number;
  status: string;
  quantity: number;
};

export class storeOrders {
  async getAllOrders(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get orders. Error:${error}`);
    }
  }

  async getOrderByID(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=$1 ;";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get Order with id=${id}. Error:${error}`);
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (status, quantity, user_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *;";
      const result = await conn.query(sql, [
        order.status,
        order.quantity,
        order.user_id,
        order.product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not create order with user id = ${order.user_id}. Error:${error}`
      );
    }
  }

  async updateOrder(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE orders SET status = $1, quantity = $2, user_id = $3, product_id = $4 WHERE id = $5 RETURNING *;";
      const result = await conn.query(sql, [
        order.status,
        order.quantity,
        order.user_id,
        order.product_id,
        order.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not update order with id = ${order.id}. Error:${error}`
      );
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM orders WHERE id = $1 RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not delete order with id = ${id}. Error:${error}`);
    }
  }
}
