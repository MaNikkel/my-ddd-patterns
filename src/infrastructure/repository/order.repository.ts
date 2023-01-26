import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: order.items.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        product_id: i.productId,
        quantity: i.quantity
      }))

    }, {
      include: [{
        model: OrderItemModel
      }]
    })
  }

  private async findOrderModel(id: string): Promise<OrderModel> {
    const orderModel = await OrderModel.findOne({ where: { id: id }, include: [{ model: OrderItemModel }]})

    if(!orderModel) {
      throw new Error('order not found')
    }

    return orderModel
  }
  
  async update(order: Order): Promise<void> {

    await OrderModel.update({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
    }, { where: { id: order.id }})

    order.items.map(async i => {
      await OrderItemModel.upsert({
        id: i.id,
        name: i.name,
        price: i.price,
        product_id: i.productId,
        quantity: i.quantity,
        order_id: order.id,
      })
    })

  }
  
  async find(id: string): Promise<Order> {
    const orderModel = await this.findOrderModel(id)

    const items = orderModel?.items.map(i => (new OrderItem(i.id, i.name, i.price, i.quantity, i.product_id))) ?? []


    const order = new Order(
      orderModel?.id,
      orderModel?.customer_id,
      items
    )

    return order
    
    
  }
  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: [{ model: OrderItemModel }] })

    const orders = ordersModel.map(o => {
      const items = o.items.map(i => (new OrderItem(i.id, i.name, i.price, i.quantity, i.product_id))) ?? []

      return new Order(
        o?.id,
        o?.customer_id,
        items
      )
    })

    return orders
  }
}