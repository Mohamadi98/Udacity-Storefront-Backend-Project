import client from "../database";
import express from "express";
import authorizeToken from "../middlewares/tokenAuthorization";

const ordersListRouter = express.Router();

const list = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const conn = await client.connect();
    const sql =
      "SELECT u.firstname, u.lastname, p.name, p.price, p.category, o.status, o.quantity FROM users as u JOIN orders as o ON u.id = o.user_id JOIN product as p ON o.product_id = p.id;";
    const result = await conn.query(sql);
    conn.release;
    if (!result.rows.length) {
      res.send("there is no current orders list");
    }
    res.json(result.rows);
  } catch (error) {
    res.status(400).json(error);
  }
};

ordersListRouter.get("/productsorder", authorizeToken, list);

export default ordersListRouter;
