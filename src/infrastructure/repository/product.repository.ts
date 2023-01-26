import Product from '../../domain/entity/product';
import ProductRepositoryInterface from '../../domain/repository/product-repository.interface'
import ProductModel from '../db/sequelize/model/product.model';

export default class ProductRepository implements ProductRepositoryInterface {
  
  async create(product: Product) {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price
    })

  }
  
  async update(product: Product) {
    await ProductModel.update({
      name: product.name,
      price: product.price
    }, {
      where: {id: product.id}
    })

  }
  
  async find(id: string): Promise<Product> {
    const p = await ProductModel.findOne({ where: { id: id }})


    if (p)
      return new Product(p?.id, p?.name, p?.price) 

    throw new Error('Error');
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()

    return products.map(product => new Product(product.id, product.name, product.price))
  }


}