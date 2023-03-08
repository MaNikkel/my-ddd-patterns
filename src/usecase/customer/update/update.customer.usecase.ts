import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(dto: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.find(dto.id);
    customer.changeName(dto.name);
    customer.changeAddress(new Address(dto.address.street, dto.address.number, dto.address.zip, dto.address.city));

    await this.customerRepository.update(customer);

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