import { storeOrders, Order, productsOrder } from "../models/order";
import express from "express";
import checkProductExist from "../utils/checkProduct";
import checkUserExist from "../utils/checkUser";
import authorizeToken from "../middlewares/tokenAuthorization";
import checkOrderExist from "../utils/checkOrder";

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
      return;
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
    if (
      req.body.status === undefined ||
      req.body.user_id === undefined
    ) {
      res.status(400).json("missing important parameters");
    }
    const order: Order = req.body;

    if ((await checkUserExist(order.user_id)) === false) {
      res.status(400).json(`No user with id = ${order.user_id}`);
      return;
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
    if (
      req.body.status === undefined ||
      req.body.user_id === undefined ||
      req.body.id === undefined
    ) {
      res.status(400).json("missing important parameters");
      return;
    }
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

const orderProducts = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    if (
      req.body.quantity === undefined ||
      req.body.order_id === undefined ||
      req.body.product_id === undefined
    ) {
      res.status(400).json("missing important parameters");
      return;
    }
    
    const product: productsOrder = req.body;
    if ((await checkProductExist(product.product_id)) === false) {
      res.status(400).json(`No user with id = ${product.product_id}`);
      console.log("you were right in product");
      return;
    }
    if ((await checkOrderExist(product.order_id) === false)) {
      res.status(400).json(`No order with id = ${product.order_id}`);
      console.log("you were right in order");
      return;
    }

    const newProductOrder: productsOrder = await orderAgent.productsToOrder(product);
    res.json(newProductOrder);

  } catch (error) {
    res.status(400).json(error);
  }
}

const getCurrentOrders = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id) as number;
    if ((await checkUserExist(id) === false)) {
      res.status(400).json(`No user with id = ${id}`);
    }
    const orders: Order[] = await orderAgent.getCurrentUserOrders(id);
    if (orders.length === 0) {
      res.json("this user currently does not have any orders");
      return;
    }
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
    
  }
}

orderRouter.get("/orders", authorizeToken, index);
orderRouter.get("/orders/:id", authorizeToken, show);
orderRouter.post("/orders", authorizeToken, create);
orderRouter.put("/orders", authorizeToken, update);
orderRouter.delete("/orders/:id", authorizeToken, del);
orderRouter.post('/productsorder', authorizeToken, orderProducts);
orderRouter.get('/getcurrentorders/:id', authorizeToken, getCurrentOrders);

export default orderRouter;
