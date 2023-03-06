import Address from "../../../domain/customer/entity/address"
import Customer from "../../../domain/customer/entity/customer"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import { FindCustomerUseCase } from "./find.customer.usecase"


const customerInput = new Customer('1', 'dummy')
const address = new Address('1', 1, '123', 'City')
customerInput.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customerInput)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test find customer use case', () => {

  let customerRepository= MockRepository()
  let usecase: FindCustomerUseCase

  

  beforeAll(async () => {
    await customerRepository.create(customerInput)

    usecase = new FindCustomerUseCase(customerRepository)
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

  it('should not find a customer', async () => {
    customerRepository.find.mockImplementationOnce(() => {throw new Error('customer not found')})
    const input = {
      id: customerInput.id
    }

     expect(() => usecase.execute(input)).rejects.toThrow('customer not found')

  })
})