import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";


export default class ProductFactory {
  static create(name: string, price: number, type = "a", ): ProductInterface {
    const id = Math.random().toString()

    switch (type) {
      case "a":
        return new Product(id, name, price)
      default:
        throw new Error("not valid")
    }

  }
}