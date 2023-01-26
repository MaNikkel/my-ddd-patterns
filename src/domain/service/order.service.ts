import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderService {
  static total(orders: Order[]): number {
    const total = orders.reduce((acc, cur) => acc + cur.total(), 0)

    return total
  }

  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {

      const order = new Order(Math.random().toString(), customer.id, orderItems)

      customer.addRewardPoints(order.total()/2)

      return order
  }
}