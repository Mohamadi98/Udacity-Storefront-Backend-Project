import express, { request, response } from "express";
import dotenv from "dotenv";
import usersRouter from "./handlers/userHandler";
import productsRouter from "./handlers/productHandler";
import orderRouter from "./handlers/orderHandler";
import bodyParser from "body-parser";
import ordersListRouter from "./Services/productsOrderList";

dotenv.config();
const app: express.Application = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(usersRouter);
app.use(productsRouter);
app.use(orderRouter);
app.use(ordersListRouter);

app.get("/", (_req: express.Request, res: express.Response) => {
  res.send("server started");
});

app.listen(PORT, () => {
  console.log(`server started at port = ${PORT}`);
});

export default app;
