import { Order, storeOrders, productsOrder } from "../models/order";
import { Product, storeProducts } from "../models/product";
import { User, storeUsers } from "../models/users";
import client from "../database";

const orderAgent = new storeOrders();
const userAgent = new storeUsers();
const productAgent = new storeProducts();

describe("testing orders model CRUD operations", (): void => {
  const product: Product = {
    name: "testproduct",
    price: 500,
    category: "testcategory",
  };

  const user: User = {
    firstName: "testname",
    lastName: "testlastname",
    password: "testpassword",
  };

  const order: Order = {
    user_id: 1,
    status: "active"
  };

  beforeAll(async (): Promise<void> => {
    const newUser: User = await userAgent.createUser(user);
    const newProduct: Product = await productAgent.createProduct(product);
    const newOrder: Order = await orderAgent.createOrder(order);
  });

  afterAll(async (): Promise<void> => {
    const conn = await client.connect();
    const sql3 = "DELETE FROM orders;";
    const sql4 = "ALTER SEQUENCE orders_id_seq RESTART WITH 1;";
    const sql1 = "DELETE FROM order_products;";
    const sql2 = "ALTER SEQUENCE order_products_id_seq RESTART WITH 1;";
    const sql5 = "DELETE FROM product;";
    const sql6 = "ALTER SEQUENCE product_id_seq RESTART WITH 1;";
    const sql7 = "DELETE FROM users;";
    const sql8 = "ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql1);
    await conn.query(sql2);
    await conn.query(sql3);
    await conn.query(sql4);
    await conn.query(sql5);
    await conn.query(sql6);
    await conn.query(sql7);
    await conn.query(sql8);
    conn.release();
  });

  it("testing create method existance", async (): Promise<void> => {
    expect(orderAgent.createOrder).toBeDefined();
  });

  it("testing get all method existance", async (): Promise<void> => {
    expect(orderAgent.getAllOrders).toBeDefined();
  });

  it("testing get by ID method existance", async (): Promise<void> => {
    expect(orderAgent.getOrderByID).toBeDefined();
  });

  it("testing delete method existance", async (): Promise<void> => {
    expect(orderAgent.deleteOrder).toBeDefined();
  });

  it("testing update method existance", async (): Promise<void> => {
    expect(orderAgent.updateOrder).toBeDefined();
  });

  it("testing create method functionality", async (): Promise<void> => {
    const newOrder: Order = await orderAgent.createOrder(order);

    expect(newOrder.user_id === order.user_id).toBeTrue;
  });

  it("testing update method functionality", async (): Promise<void> => {
    const updatedOrder: Order = await orderAgent.updateOrder({
      status: "completed",
      user_id: 1,
      id: 1,
    });

    expect(updatedOrder.status === order.status).toBeFalse;
  });

  it("testing delete method functionality", async (): Promise<void> => {
    const deleteOrder: Order = await orderAgent.deleteOrder(1);

    const order: Order[] = await orderAgent.getAllOrders();

    expect(order).toBeNull;
  });

  it("testing products order list functionality", async(): Promise<void> => {
    const productsOrderList: productsOrder = await orderAgent.productsToOrder({
      quantity: 10,
      order_id: 2,
      product_id: 1
    });

    expect(productsOrderList.quantity === 10).toBeTrue;

  });
});
