import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repository/sequelize/customer.model';

const app = express();

app.use(express.json());

app.use('/customer', require('./routes/customer.routes').router)

let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  sequelize.addModels([CustomerModel])

  await sequelize.sync();
}

setupDb();


export { app, sequelize }