import { CreateCustomerUseCase } from "./create.customer.usecase"

const input = {
  name: 'Joe doe',
  address: {
    street: 'street',
    number: 123,
    zip: '123',
    city: 'city',
  }
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test Create Customer use case', () => {
  const customerRepository= MockRepository()
  const usecase =  new CreateCustomerUseCase(customerRepository);


  it('should create a customer', async () => {
    const customer = await usecase.execute(input)

    expect(customer.id).toEqual(expect.any(String))
    expect(customer.name).toBe(input.name)
    expect(customer.address.city).toBe(input.address.city)
    expect(customer.address.number).toBe(input.address.number)
    expect(customer.address.street).toBe(input.address.street)
    expect(customer.address.zip).toBe(input.address.zip)
    expect(customerRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if name is not provided', async () => {

    const input = {
      name: '',
      address: {
        street: 'street',
        number: 123,
        zip: '123',
        city: 'city',
      }
    }

    await expect(usecase.execute(input)).rejects.toThrow('Name is required')
  })
})