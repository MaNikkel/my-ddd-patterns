import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(dto: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const address = new Address(dto.address.street, dto.address.number, dto.address.zip, dto.address.city)
    const customer = CustomerFactory.createWithAddress(dto.name, address)

    customer.changeAddress(address);

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.address.city,
        number: customer.address.number,
        street: customer.address.street,
        zip: customer.address.zip,
      }
    };
  }
}

