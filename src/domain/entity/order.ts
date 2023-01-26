import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items

    this._total = this.total()

    this.validate()
  }

  get id() { return this._id}

  get customerId() { return this._customerId }

  get items() { return this._items }

  private validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    
    if (this._items.length === 0) {
      throw new Error("Items should be filled");
    }

    if (this._items.some(i => i.quantity <= 0)) {
      throw new Error('Quantity should be greater than 0')
    }
   
  }

  addItem(item: OrderItem) {
    this._items.push(item);
  }

  total() {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
  }

}