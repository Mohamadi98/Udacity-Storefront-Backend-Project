import { storeOrders, Order } from "../models/order";
import express from "express";
import checkProductExist from "../utils/checkProduct";
import checkUserExist from "../utils/checkUser";
import authorizeToken from "../middlewares/tokenAuthorization";

const orderRouter = express.Router();
const orderAgent = new storeOrders();

const index = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const orders: Order[] = await orderAgent.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id) as number;
    const order: Order = await orderAgent.getOrderByID(id);
    if (order == null) {
      res.status(400).send(`there is no order with id = ${id}`);
    }
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const order: Order = req.body;

    if ((await checkUserExist(order.user_id)) === false) {
      res.status(400).json(`No user with id = ${order.user_id}`);
    }

    if ((await checkProductExist(order.product_id)) === false) {
      res.status(400).json(`No product with id = ${order.product_id}`);
    }

    const newOrder: Order = await orderAgent.createOrder(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const order: Order = req.body;
    const newOrder: Order = await orderAgent.updateOrder(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const del = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id) as number;
    const order: Order = await orderAgent.deleteOrder(id);
    if (order == null) {
      res.status(400).send(`there is no order with id = ${id}`);
    }
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

orderRouter.get("/orders", authorizeToken, index);
orderRouter.get("/orders/:id", authorizeToken, show);
orderRouter.post("/orders", authorizeToken, create);
orderRouter.put("/orders", authorizeToken, update);
orderRouter.delete("/orders/:id", authorizeToken, del);

export default orderRouter;
