import { Sequelize } from "sequelize-typescript"
import Address from "../../../../domain/customer/entity/address"
import Customer from "../../../../domain/customer/entity/customer"
import CustomerModel from "./customer.model"
import ProductModel from "../../../product/repository/sequelize/product.model"
import CustomerRepository from "./customer.repository"

describe('Customer Repository test', () => {
  let sequlize: Sequelize

  beforeEach(async () => {
    sequlize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequlize.addModels([CustomerModel])
    await sequlize.sync()
  })

  afterEach(async () => {
    await sequlize.close()
  })

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('1', '1')
    const address = new Address('s', 1, '80', 'a')

    customer.address = address

    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } })

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      city: address.city,
      number: address.number,
      rewardPoints: customer.rewardPoints,
      street: address.street,
      zipcode: address.zip
    })

  })
  
  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('1', '1')
    const address = new Address('s', 1, '80', 'a')

    customer.address = address

    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } })

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      city: address.city,
      number: address.number,
      rewardPoints: customer.rewardPoints,
      street: address.street,
      zipcode: address.zip
    })

    customer.changeName('Fritz')
    customer.addRewardPoints(90)

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel2?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      city: address.city,
      number: address.number,
      rewardPoints: customer.rewardPoints,
      street: address.street,
      zipcode: address.zip
    })
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('1', '1')
    const address = new Address('s', 1, '80', 'a')

    customer.address = address

    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } })

    const foundCustomer = await customerRepository.find(customer.id)

    expect(customerModel?.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      active: foundCustomer.isActive(),
      city: foundCustomer.address.city,
      number: foundCustomer.address.number,
      rewardPoints: foundCustomer.rewardPoints,
      street: foundCustomer.address.street,
      zipcode: foundCustomer.address.zip
    })
  });


  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('1', '1')
    const address = new Address('s', 1, '80', 'a')

    customer.address = address

    await customerRepository.create(customer)


    const customer2 = new Customer('2', '2')
    const address2 = new Address('st', 21, '81', 'ab')

    customer2.address = address2

    await customerRepository.create(customer2)

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer, customer2];

    expect(customers).toEqual(foundCustomers);    
  });

  
})