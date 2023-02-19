import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class storeProducts {
  async getAllProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM product;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get products. Error:${error}`);
    }
  }

  async getProductByID(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM product WHERE id=$1 ;";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get Product with id=${id}. Error:${error}`);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO product (name, price, category) VALUES ($1, $2, $3) RETURNING *;";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not create product with name:${product.name}. Error:${error}`
      );
    }
  }

  async updateProduct(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE product SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *;";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
        product.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not update Product with id = ${product.id}. Error:${error}`
      );
    }
  }

  async deleteProduct(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM product WHERE id = $1 RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not delete Product with id = ${id}. Error:${error}`
      );
    }
  }
}
