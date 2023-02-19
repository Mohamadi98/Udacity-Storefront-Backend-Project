import supertest from "supertest";
import app from "../index";
import client from "../database";
import { User } from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const request = supertest(app);
const userID: number = 1;

describe("Suite: testing user endpoint", (): void => {
  const user: User = {
    firstName: "firstnametest",
    lastName: "lastnametest",
    password: "testpassword",
  };
  const token = jwt.sign(user, process.env.TOKEN_SECRET as string);

  beforeAll(async (): Promise<void> => {
    const result = await request.post("/users").send(user);
  });

  afterAll(async (): Promise<void> => {
    const conn = await client.connect();
    const sql = "DELETE FROM users;";
    const sql2 = "ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql);
    await conn.query(sql2);
    conn.release();
  });

  it("testing get all users endpoint", async (): Promise<void> => {
    const response = await request.get("/users");
    expect(response.status).toBe(200);
  });

  it("testing getting users by ID endpoint", async (): Promise<void> => {
    const response = await request.get(`/users/${userID}`);
    expect(response.status).toBe(200);
  });

  it("testing creating a user endpoint", async (): Promise<void> => {
    const response = await request.post("/users").send({
      firstName: "firstnametest2",
      lastName: "lastnametest2",
      password: "passwordtest2",
    });
    expect(response.status).toBe(200);
  });

  it("update endpoint, should reject as it requires a token", async (): Promise<void> => {
    const response = await request.put(`/users`).send({
      firstName: "updatedtestname",
      lastName: "updatedtestlastname",
      password: "updatedpassword",
      id: 1,
    });
    expect(response.status).toBe(400);
  });

  it("testing update endpoint", async (): Promise<void> => {
    const response = await request
      .put(`/users`)
      .send({
        firstName: "updatedtestname",
        lastName: "updatedtestlastname",
        password: "updatedpassword",
        id: 1,
      })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("delete endpoint, should reject as it requires a token", async (): Promise<void> => {
    const response = await request.delete(`/users/${userID}`);
    expect(response.status).toBe(400);
  });

  it("testing delete endpoint", async (): Promise<void> => {
    const response = await request
      .delete(`/users/${userID}`)
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });

  it("testing the products order list", async (): Promise<void> => {
    const response = await request
      .get("/productsorder")
      .set("Authorization", "Bearer " + token);

      expect(response.status).toBe(200);
  });
});
