import Product from "./product"

describe('Product Unit Tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Product("", 'Product 1', 100)
    }).toThrowError("Id is required")
  })
  
  it('should throw error when name is empty', () => {
    expect(() => {
      new Product("11", '', 100)
    }).toThrowError("Name is required")
  })
  
  it('should throw error when price is less than 0', () => {
    expect(() => {
      new Product("11", 'Product 1', -1)
    }).toThrowError("Price is invalid")
  })
  
  it('should change product name', () => {
    const product = new Product("11", 'Product 1', 1)
    
    product.changeName('Product 2')

    expect(product.name).toEqual('Product 2')
  })
  
  it('should throw error when trying to change product name to empty name', () => {
    const product = new Product("11", 'Product 1', 1)
    
    expect(() => {
      product.changeName('')
    }).toThrowError("Name is required")

  })

  it('should change product price', () => {
    const product = new Product("11", 'Product 1', 1)
    
    product.changePrice(2)

    expect(product.price).toEqual(2)
  })

  it('should throw error when trying to change product price to less than 0 value', () => {
    const product = new Product("11", 'Product 1', 1)
    
    expect(() => {
      product.changePrice(-9)
    }).toThrowError("Price is invalid")

  })
})