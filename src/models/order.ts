import client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type productsOrder = {
  id?: number,
  quantity: number,
  order_id: number,
  product_id: number
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
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;";
      const result = await conn.query(sql, [
        order.status,
        order.user_id,
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
        "UPDATE orders SET status = $1, user_id = $2 WHERE id = $3 RETURNING *;";
      const result = await conn.query(sql, [
        order.status,
        order.user_id,
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

  async productsToOrder(product: productsOrder): Promise<productsOrder> {
    try {
      const conn = await client.connect();
      const sql = 
      "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;";
      const result = await conn.query(sql, [product.quantity, product.order_id, product.product_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create a product order with order id = ${product.order_id}. Error:${error}`);
    }
  }

  async getCurrentUserOrders(id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 
      "SELECT * FROM orders WHERE user_id = $1;";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get orders for user with id = ${id}. Error:${error}`);
    }
  }
}
