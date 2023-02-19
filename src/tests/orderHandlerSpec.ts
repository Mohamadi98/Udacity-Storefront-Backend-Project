import supertest from "supertest";
import app from "../index";
import client from "../database";
import { Product } from "../models/product";
import { User } from "../models/users";
import { Order, productsOrder } from "../models/order";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const request = supertest(app);
const productID: number = 1;
const orderID: number = 1;
const userID: number = 1;

describe("Suite: testing order endpoint", (): void => {
  const user: User = {
    firstName: "firstnametest",
    lastName: "lastnametest",
    password: "testpassword",
  };

  const product: Product = {
    name: "testproduct",
    price: 200,
    category: "electronics",
  };

  const order: Order = {
    user_id: 1,
    status: "active"
  };

  const productList: productsOrder = {
    quantity: 5,
    order_id: 1,
    product_id: 1
  }
  const token = jwt.sign(user, process.env.TOKEN_SECRET as string);

  beforeAll(async (): Promise<void> => {
    const response = await request.post("/users").send(user);

    const response2 = await request
      .post("/products")
      .send(product)
      .set("Authorization", "Bearer " + token);

    const response3 = await request
      .post("/orders")
      .send(order)
      .set("Authorization", "Bearer " + token);
  });

  afterAll(async (): Promise<void> => {
    const conn = await client.connect();
    const sql3 = "DELETE FROM orders;";
    const sql4 = "ALTER SEQUENCE orders_id_seq RESTART WITH 1;";
    const sql1 = "DELETE FROM order_products;";
    const sql2 = "ALTER SEQUENCE order_products_id_seq RESTART WITH 1;";
    const sql5 = "DELETE FROM product;";
    const sql6 = "ALTER SEQUENCE product_id_seq RESTART WITH 1;";
    const sql7 = "DELETE FROM users;";
    const sql8 = "ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql1);
    await conn.query(sql2);
    await conn.query(sql3);
    await conn.query(sql4);
    await conn.query(sql5);
    await conn.query(sql6);
    await conn.query(sql7);
    await conn.query(sql8);
    conn.release();
  });

  it("testing get all orders endpoint", async (): Promise<void> => {
    const response = await request
      .get("/orders")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("testing getting orders by ID endpoint", async (): Promise<void> => {
    const response = await request
      .get(`/orders/${orderID}`)
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("testing creating an order endpoint", async (): Promise<void> => {
    const response = await request
      .post("/orders")
      .send({
        status: "completed",
        user_id: 1
      })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("testing get current orders endpoint", async(): Promise<void> => {
    const response = await request.get(`/getcurrentorders/${userID}`).
    set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
  });

  it("orders update endpoint, should reject as it requires a token", async (): Promise<void> => {
    const response = await request.put(`/orders`).send({
      status: "active",
      user_id: 1,
      id: 2
    });
    expect(response.status).toBe(400);
  });

  it("testing orders update endpoint", async (): Promise<void> => {
    const response = await request
      .put(`/orders`)
      .send({
        status: "active",
        user_id: 1,
        id: 2
      })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("orders delete endpoint, should reject as it requires a token", async (): Promise<void> => {
    const response = await request.delete(`/orders/${orderID}`);
    expect(response.status).toBe(400);
  });

  it("testing orders delete endpoint", async (): Promise<void> => {
    const response = await request
      .delete(`/orders/${orderID}`)
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

});
