import { Product, storeProducts } from "../models/product";
import client from "../database";

const productAgent = new storeProducts();

describe("testing product model CRUD operations", (): void => {
  const product: Product = {
    name: "testproduct",
    price: 500,
    category: "testcategory",
  };

  afterAll(async (): Promise<void> => {
    const conn = await client.connect();
    const sql = "DELETE FROM product;";
    const sql2 = "ALTER SEQUENCE product_id_seq RESTART WITH 1;";
    const sql3 = "DELETE FROM users;";
    const sql4 = "ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql);
    await conn.query(sql2);
    await conn.query(sql3);
    await conn.query(sql4);
    conn.release();
  });

  it("testing create method existance", async (): Promise<void> => {
    expect(productAgent.createProduct).toBeDefined();
  });

  it("testing get all method existance", async (): Promise<void> => {
    expect(productAgent.getAllProducts).toBeDefined();
  });

  it("testing get by ID method existance", async (): Promise<void> => {
    expect(productAgent.getProductByID).toBeDefined();
  });

  it("testing delete method existance", async (): Promise<void> => {
    expect(productAgent.deleteProduct).toBeDefined();
  });

  it("testing update method existance", async (): Promise<void> => {
    expect(productAgent.updateProduct).toBeDefined();
  });

  it("testing create method functionality", async (): Promise<void> => {
    const newProduct: Product = await productAgent.createProduct(product);

    expect(newProduct.name === product.name).toBeTrue;
  });

  it("testing update method functionality", async (): Promise<void> => {
    const updatedProduct: Product = await productAgent.updateProduct({
      name: "updatedproductname",
      price: 50,
      category: "updatedcategory",
      id: 1,
    });

    expect(updatedProduct.name === product.name).toBeFalse;
  });

  it("testing delete method functionality", async (): Promise<void> => {
    const deletedProduct: Product = await productAgent.deleteProduct(1);

    const product: Product[] = await productAgent.getAllProducts();

    expect(product).toBeNull;
  });
});
