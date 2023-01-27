import Address from "../../../../domain/customer/entity/address"
import Customer from "../../../../domain/customer/entity/customer"
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface"
import CustomerModel from "./customer.model"


export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      number: customer.address.number,
      street: customer.address.street,
      zipcode: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  }
  
  async update(customer: Customer): Promise<void> {
    await CustomerModel.update({
      id: customer.id,
      name: customer.name,
      number: customer.address.number,
      street: customer.address.street,
      zipcode: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    }, {
      where: {
        id: customer.id,
      }
    })
  }
  
  async find(id: string): Promise<Customer> {
    const c = await CustomerModel.findOne({ where: { id: id }})

    const customer = new Customer(c?.id!, c?.name!)
    const address = new Address(c?.street!, c?.number!, c?.zipcode!, c?.city!)

    customer.address = address

    return customer
    
  }
  async findAll(): Promise<Customer[]> {
    const c = await CustomerModel.findAll()

    return c.map(cm => {
      const customer = new Customer(cm.id, cm.name)
      customer.address = new Address(cm.street!, cm.number!, cm.zipcode!, cm.city!)

      return customer
    })
  }
}