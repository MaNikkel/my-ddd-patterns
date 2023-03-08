import Address from "../../../domain/customer/entity/address"
import Customer from "../../../domain/customer/entity/customer"
import { UpdateCustomerUseCase } from "./update.customer.usecase"


const customerInput = new Customer('1', 'dummy')
const address = new Address('1', 1, '123', 'City')

const input = {
  id: customerInput.id,
  name: 'Joe doe',
  address: {
    street: 'street',
    number: 123,
    zip: '123',
    city: 'city',
  }
}

customerInput.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customerInput)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test Update Customer use case', () => {
  const customerRepository = MockRepository()
  const usecase = new UpdateCustomerUseCase(customerRepository)

  it('should update a customer', async () => {
    const customer = await usecase.execute(input)

    expect(customer.id).toEqual(input.id)
    expect(customer.name).toBe(input.name)
    expect(customer.address.city).toBe(input.address.city)
    expect(customer.address.number).toBe(input.address.number)
    expect(customer.address.street).toBe(input.address.street)
    expect(customer.address.zip).toBe(input.address.zip)
    expect(customerRepository.update).toHaveBeenCalledTimes(1)
  })

})