import supertest from "supertest";
import app from "../index";
import client from "../database";
import { Product } from "../models/product";
import { User } from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const request = supertest(app);
const productID: number = 1;

describe("Suite: testing product endpoint", (): void => {
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
  const token = jwt.sign(user, process.env.TOKEN_SECRET as string);

  beforeAll(async (): Promise<void> => {
    const response = await request.post("/users").send(user);

    const response2 = await request
      .post("/products")
      .send(product)
      .set("Authorization", "Bearer " + token);
  });

  afterAll(async (): Promise<void> => {
    const conn = await client.connect();
    const sql = "DELETE FROM product;";
    const sql2 = "ALTER SEQUENCE product_id_seq RESTART WITH 1;";
    await conn.query(sql);
    await conn.query(sql2);
    conn.release();
  });

  it("testing get all products endpoint", async (): Promise<void> => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("testing getting products by ID endpoint", async (): Promise<void> => {
    const response = await request.get(`/products/${productID}`);
    expect(response.status).toBe(200);
  });

  it("testing creating a product endpoint", async (): Promise<void> => {
    const response = await request
      .post("/products")
      .send({
        name: "testproduct2",
        price: 100,
        category: "furniture",
      })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("products delete endpoint, should reject as it requires a token", async (): Promise<void> => {
    const response = await request.delete(`/products/${productID}`);
    expect(response.status).toBe(400);
  });

  it("testing products delete endpoint", async (): Promise<void> => {
    const response = await request
      .delete(`/products/${productID}`)
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("products update endpoint, should reject as it requires a token", async (): Promise<void> => {
    const response = await request.put(`/products`).send({
      name: "testproduct3",
      price: 300,
      category: "skin care",
      id: 1,
    });
    expect(response.status).toBe(400);
  });

  it("testing products update endpoint", async (): Promise<void> => {
    const response = await request
      .put(`/products`)
      .send({
        name: "testproduct3",
        price: 300,
        category: "skin care",
        id: 1,
      })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });
});
