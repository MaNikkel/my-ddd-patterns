import { Router } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

const router = Router();

router.post("/", async (req, res) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const dto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      }
    }

    const output = await usecase.execute(dto)

    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }

})

export { router }