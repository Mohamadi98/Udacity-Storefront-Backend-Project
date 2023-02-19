import { storeProducts, Product } from "../models/product";

const productAgent = new storeProducts();

const checkProductExist = async (id: number): Promise<Boolean> => {
  const result: Product = await productAgent.getProductByID(id);
  if (result == null) {
    return false;
  }
  return true;
};

export default checkProductExist;
