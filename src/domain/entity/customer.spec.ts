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