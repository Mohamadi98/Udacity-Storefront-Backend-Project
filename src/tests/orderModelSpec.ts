import { Order, storeOrders } from "../models/order";
import { Product, storeProducts } from "../models/product";
import { User, storeUsers } from "../models/users";
import client from "../database";

const orderAgent = new storeOrders();
const userAgent = new storeUsers();
const productAgent = new storeProducts();

describe("testing product model CRUD operations", (): void => {
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
    product_id: 1,
    status: "active",
    quantity: 5,
  };

  beforeAll(async (): Promise<void> => {
    const newUser: User = await userAgent.createUser(user);
    const newProduct: Product = await productAgent.createProduct(product);
  });

  afterAll(async (): Promise<void> => {
    const conn = await client.connect();
    const sql = "DELETE FROM orders;";
    const sql2 = "ALTER SEQUENCE orders_id_seq RESTART WITH 1;";
    await conn.query(sql);
    await conn.query(sql2);
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
      quantity: 10,
      user_id: 1,
      product_id: 1,
      id: 1,
    });

    expect(updatedOrder.quantity === order.quantity).toBeFalse;
  });

  it("testing delete method functionality", async (): Promise<void> => {
    const deleteOrder: Order = await orderAgent.deleteOrder(1);

    const order: Order[] = await orderAgent.getAllOrders();

    expect(order).toBeNull;
  });
});
