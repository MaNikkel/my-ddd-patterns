import { Sequelize } from "sequelize-typescript"
import Address from "../../../domain/customer/entity/address"
import Customer from "../../../domain/customer/entity/customer"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import { FindCustomerUseCase } from "./find.customer.usecase"

describe('Test find customer use case', () => {
  let sequlize: Sequelize

  let customerRepository: CustomerRepositoryInterface
  let usecase: FindCustomerUseCase

  const customerInput = new Customer('1', 'dummy')

  const address = new Address('1', 1, '123', 'City')

  customerInput.changeAddress(address)

  beforeAll(async () => {

    sequlize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequlize.addModels([CustomerModel])
    await sequlize.sync()
    customerRepository = new CustomerRepository()
    await customerRepository.create(customerInput)

    usecase = new FindCustomerUseCase(customerRepository)
  })


  afterAll(async () => {
    await sequlize.close()
  })

  it("should find a customer", async () => {
    const input = {
      id: customerInput.id
    }

    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: '1',
      name: 'dummy',
      address: {
        street: '1',
        city: 'City',
        number: 1,
        zip: '123'
  }
    })
  })

})