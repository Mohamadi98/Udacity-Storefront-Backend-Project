import { storeOrders, Order } from "../models/order";

const orderAgent = new storeOrders();

const checkOrderExist = async (id: number): Promise<Boolean> => {
  const result: Order = await orderAgent.getOrderByID(id);
  if (result == null) {
    return false;
  }
  return true;
};

export default checkOrderExist;