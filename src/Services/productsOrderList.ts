import client from "../database";
import express from "express";
import authorizeToken from "../middlewares/tokenAuthorization";

const productsToOrdersListRouter = express.Router();

const list = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const conn = await client.connect();
    const sql =
    "SELECT u.firstname, u.lastname, p.name, p.price, p.category, o.status, op.quantity FROM users as u JOIN orders as o ON u.id = o.user_id JOIN order_products as op ON o.id = op.order_id JOIN product as p ON p.id = op.product_id;";
    const result = await conn.query(sql);
    conn.release;
    if (!result.rows.length) {
      res.send("there is no current orders list");
      return;
    }
    res.json(result.rows);
  } catch (error) {
    res.status(400).json(error);
  }
};

productsToOrdersListRouter.get("/productsorder", authorizeToken, list);

export default productsToOrdersListRouter;
