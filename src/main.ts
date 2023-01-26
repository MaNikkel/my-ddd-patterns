import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("124", "Alo");
const address = new Address("Rua", 123, "111-1", "oi")

customer.address = address;
customer.activate()


const item1 = new OrderItem("1", "1", 1, 1, '1')
const item2 = new OrderItem("2", "2", 2, 1, '1')

const order = new Order("1", "124", [item1, item2])