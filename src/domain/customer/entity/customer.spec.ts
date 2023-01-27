import Address from "./address"
import Customer from "./customer"

describe('Customer Unit Tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'Fritz')
    }).toThrowError("Id is required")
  })
  
  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('1', '')
    }).toThrowError("Name is required")
  })
  
  it('should throw error when trying change name to empty', () => {
    const customer = new Customer('1', 'Fritz')
    expect(() => {
      customer.changeName('')
    }).toThrowError("Name is required")
  })
 
  it('should change name', () => {
    // Arrange
    const customer = new Customer('1', 'Fritz')
    
    // Act
    customer.changeName('Sofia')

    // Assert
    expect(customer.name).toBe('Sofia')
  })
  
  it('should send event when created', () => {
    const s = jest.spyOn(console, 'log')
    let customer: Customer = new Customer('1', 'Fritz')


    
    expect(customer.eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()
    expect(customer.eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2)
    expect(s).toHaveBeenCalledTimes(2)
    expect(s).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated')
    expect(s).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated')

  })
  
  it('should change adress and send event', () => {
    const customer: Customer = new Customer('1', 'Fritz')
    const address = new Address('1', 1, '123', 'City')
    const s = jest.spyOn(customer.eventDispatcher, 'notify')

    customer.address = address
    expect(customer.address).toBe(address)
    expect(customer.eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toBeDefined()
    expect(customer.eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length).toBe(1)

    const newAddress = new Address('12', 11, '123321', 'City 2')
    customer.changeAddress(newAddress)

    expect(customer.address).toBe(newAddress)

    expect(s).toHaveBeenCalledTimes(1)

  })

  it('should activate customer', () => {
    // Arrange
    const customer = new Customer('1', 'Fritz 1')
    const address = new Address('1', 123, '222', 'Curitiba')

    customer.address = address
    
    // Act
    customer.activate()
    customer.changeName('Sofia')

    // Assert
    expect(customer.isActive()).toBe(true)
  })
  
  it('should deactivate customer', () => {
    // Arrange
    const customer = new Customer('1', 'Fritz 1')
    const address = new Address('1', 123, '222', 'Curitiba')

    customer.address = address
    
    // Act
    customer.activate()

    customer.deactivate()

    // Assert
    expect(customer.isActive()).toBe(false)
  })
  
  it('should not be able to activate customer without address', () => {
    // Arrange
    const customer = new Customer('1', 'Fritz 1')
    
    // Assert
    expect(() => {
      customer.activate()
    }).toThrowError('Address needed')
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'Fritz 1')
    expect(customer.rewardPoints).toBe(0)
    
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
    
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)

  })
})