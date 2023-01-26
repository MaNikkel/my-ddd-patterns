import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active = false;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name
    this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  get name() {
    return this._name
  }

  get rewardPoints() {
    return this._rewardPoints
  }

  get id() {
    return this._id
  }

  set address(address: Address) {
    this._address = address
  }

  get address() {
    return this._address
  }

  changeName(name: string) {
    this._name = name 
    this.validate()
  }

  activate() {
    if (!this._address) {
      throw new Error('Address needed')
    }
    this._active = true;
  }

  deactivate() {
    this._active = false
  }
  
  isActive() {
    return this._active
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }
}