import Customer from "../entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe('Order Service Unit Tests', () => {

  const orderItems = [
    new OrderItem('1', '1', 10, 2, '1'),
    new OrderItem('2', '2', 20, 1, '2'),
  ]
  it('should get total amount of all orders', () => {


    const orders = [
      new Order('1', '1', [orderItems[0]]),
      new Order('1', '1', [orderItems[1]]),
      new Order('1', '1', [orderItems[1], orderItems[0]]),
    ]
    
    const total = OrderService.total(orders)

    expect(total).toBe(80)
  })

  it('should place an order', () => {
    const customer = new Customer('1', 'Fritz')

    
    const order = OrderService.placeOrder(customer, [orderItems[1]])

    expect(customer.rewardPoints).toBe(10)
    expect(order.total()).toBe(20)

  })
})