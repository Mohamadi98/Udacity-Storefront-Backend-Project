import express from "express";
import jwt from "jsonwebtoken";

const authorizeToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.status(400).json(`invalid token ${error}`);
  }
};

export default authorizeToken;
