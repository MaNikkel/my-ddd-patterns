import Order from './order'
import OrderItem from './order_item'
describe('Order Unit Tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Order("", '11', [])
    }).toThrowError("Id is required")
  })
  
  it('should throw error when customerId is empty', () => {
    expect(() => {
      new Order("asdf", '', [])
    }).toThrowError("CustomerId is required")
  })

  it('should throw error when items are empty', () => {
    expect(() => {
      new Order("asdf", 'asdf', [])
    }).toThrowError("Items should be filled")
  })
  
  it('should calculate items total correctly', () => {
    const items = [
      new OrderItem('1', 'abc', 1, 1, '1'),
      new OrderItem('2', 'abc', 1, 1, '1'),
      new OrderItem('3', 'abc', 2, 2, '1')
    ]

    const order = new Order('1', 'abc', items)

    expect(order.total()).toBe(6)
  })
  
  it('should throw error if order item quantity is less than 1', () => {
    expect(() => {
      new OrderItem('1', 'abc', 1, 0, '1')
    }).toThrow('Quantity should be greater than 0')
  })
})