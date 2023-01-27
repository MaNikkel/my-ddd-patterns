import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/address";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Product from "../../../../domain/product/entity/product";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id,
    );

    const order = new Order("123", customer.id, [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });
  
  
  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1212",
      product.name,
      product.price,
      2,
      product.id,
    );

    const order = new Order("aasdfadsf", customer.id, [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id)

    expect(foundOrder).toStrictEqual(order);
  });
  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1212",
      product.name,
      product.price,
      2,
      product.id,
    );
    
    const ordemItem2 = new OrderItem(
      "121222",
      product.name,
      product.price,
      2,
      product.id,
    );

    const order = new Order("aasdfadsf", customer.id, [ordemItem]);
    const order2 = new Order("asdf", customer.id, [ordemItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const foundOrder = await orderRepository.findAll()

    expect(foundOrder).toStrictEqual([order, order2]);
  });
  it("should throw error when order is not found", async () => {
    const orderRepository = new OrderRepository();

    await expect(async () => {
      await orderRepository.find('none')
    }).rejects.toThrowError('order not found')
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    const product2 = new Product("1223", "Product 2", 15);
    await productRepository.create(product);
    await productRepository.create(product2);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id,
    );

    const order = new Order("123", customer.id, [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    // expect(orderModel?.toJSON()).toStrictEqual({
    //   id: "1232",
    //   customer_id: "123",
    //   total: order.total(),
    //   items: [
    //     {
    //       id: ordemItem.id,
    //       name: ordemItem.name,
    //       price: ordemItem.price,
    //       quantity: ordemItem.quantity,
    //       order_id: "1232",
    //       product_id: "123",
    //     },
    //   ],
    // });

    const newOrderItem = new OrderItem(
      "22",
      product2.name,
      product2.price,
      2,
      product2.id,
    );

    order.addItem(newOrderItem)

    await orderRepository.update(order)

    const oi = await OrderItemModel.findOne({ where: { id: newOrderItem.id } })

    // console.log(oi)
    // console.log(order.items)

    const updatedOrderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    // console.log(updatedOrderModel?.items);

    expect(updatedOrderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: order.id,
          product_id: "123",
        },
        {
          id: newOrderItem.id,
          name: newOrderItem.name,
          price: newOrderItem.price,
          quantity: newOrderItem.quantity,
          order_id: order.id,
          product_id: product2.id,
        },
      ],
    });
  })
});
