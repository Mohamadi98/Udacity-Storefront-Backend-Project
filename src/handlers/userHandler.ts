import { storeUsers, User } from "../models/users";
import express from "express";
import passwordHashing from "../utils/passwordHash";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authorizeToken from "../middlewares/tokenAuthorization";

dotenv.config();
const usersRouter = express.Router();
const userAgent = new storeUsers();

const index = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const users: User[] = await userAgent.getAllUsers();
    res.json(users);
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
    const user: User = await userAgent.getUserByID(id);
    if (user == null) {
      res.status(400).json(`There is no user with id = ${id}`);
    }
    res.json(user);
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
      req.body.firstName === undefined ||
      req.body.lastName === undefined ||
      req.body.password === undefined
    ) {
      res.status(400).json("missing important parameters");
    }
    const user: User = req.body;
    const password: string = passwordHashing(user.password);
    user.password = password;
    const newUser: User = await userAgent.createUser(user);
    var token = jwt.sign(user, process.env.TOKEN_SECRET as string);
    res.json(token);
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
      req.body.firstName === undefined ||
      req.body.lastName === undefined ||
      req.body.password === undefined ||
      req.body.id === undefined
    ) {
      res.status(400).json("missing important parameters");
    }
    const user: User = req.body;
    const password: string = passwordHashing(user.password);
    user.password = password;
    const newUser: User = await userAgent.updateUser(user);
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const del = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id) as number;
    const user: User = await userAgent.deleteUser(id);
    if (user == null) {
      res.status(400).json(`There is no user with id = ${id}`);
    }
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

usersRouter.get("/users", index);
usersRouter.get("/users/:id", show);
usersRouter.post("/users", create);
usersRouter.put("/users", authorizeToken, update);
usersRouter.delete("/users/:id", authorizeToken, del);

export default usersRouter;
