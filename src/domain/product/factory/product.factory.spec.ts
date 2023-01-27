import ProductFactory from "./product.factory"

describe('Product Factory Tests', () => {
  it('should create a product with type a', () => {
    const product = ProductFactory.create("Product A", 1, "a")

    expect(product.id).toBeDefined()
    expect(product.name).toBe("Product A")
    expect(product.price).toBe(1)
    expect(product.constructor.name).toBe("Product")
  })
  
  it('should create a product with type a', () => {

    expect(() => ProductFactory.create("Product A", 1, "v")).toThrowError('not valid')

  })
})