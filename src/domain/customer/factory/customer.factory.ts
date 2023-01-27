import Address from "../entity/address";
import Customer from "../entity/customer";

export default class CustomerFactory {
  public static create(name: string): Customer {
    const id = Math.random().toString()
    return new Customer(id, name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const id = Math.random().toString()
    const customer = new Customer(id, name);
    customer.changeAddress(address);
    return customer;
  }
}
