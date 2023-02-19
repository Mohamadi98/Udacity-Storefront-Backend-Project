import { storeProducts, Product } from "../models/product";
import express from "express";
import authorizeToken from "../middlewares/tokenAuthorization";

const productsRouter = express.Router();
const productAgent = new storeProducts();

const index = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const products: Product[] = await productAgent.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id) as number;
    const product: Product = await productAgent.getProductByID(id);
    if (product == null) {
      res.status(400).send(`there is no product with id = ${id}`);
    }
    res.json(product);
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
      req.body.name === undefined ||
      req.body.price === undefined ||
      req.body.category === undefined
    ) {
      res.status(400).json("missing important parameters");
    }
    const product: Product = req.body;
    const newProduct: Product = await productAgent.createProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

const update = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (
      req.body.name === undefined ||
      req.body.category === undefined ||
      req.body.price === undefined ||
      req.body.id === undefined
    ) {
      res.status(400).json("missing important parameters");
    }
    const product: Product = req.body;
    const newProduct: Product = await productAgent.updateProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

const del = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id) as number;
    const product: Product = await productAgent.deleteProduct(id);
    if (product == null) {
      res.status(400).send(`there is no product with id = ${id}`);
    }
    res.json(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

productsRouter.get("/products", index);
productsRouter.get("/products/:id", show);
productsRouter.post("/products", authorizeToken, create);
productsRouter.put("/products", authorizeToken, update);
productsRouter.delete("/products/:id", authorizeToken, del);

export default productsRouter;
