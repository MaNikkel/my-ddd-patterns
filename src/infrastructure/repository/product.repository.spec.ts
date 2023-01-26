import { Sequelize } from "sequelize-typescript"
import Product from "../../domain/entity/product"
import ProductModel from "../db/sequelize/model/product.model"
import ProductRepository from "./product.repository"

describe('Product Repository test', () => {
  let sequlize: Sequelize

  beforeEach(async () => {
    sequlize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequlize.addModels([ProductModel])
    await sequlize.sync()
  })

  afterEach(async () => {
    await sequlize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()

    const product = new Product('1', '1', 1)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: '1' } })

    expect(productModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })

  })
  
  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel2?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    const foundProduct = await productRepository.find("1");

    expect(productModel?.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });


  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(products).toEqual(foundProducts);    
  });

  
})