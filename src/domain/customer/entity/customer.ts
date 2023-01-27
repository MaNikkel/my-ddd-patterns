

import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import SendConsoleLog1Event from "../event/handler/send-console-log-1.handler";
import SendConsoleLog2Event from "../event/handler/send-console-log-2.handler";
import SendConsoleLogWhenAddressIsChangedHandler from "../event/handler/send-console-log-when-address-is-changed.handler";
import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active = false;
  private _rewardPoints = 0;
  private _eventDispatcher: EventDispatcher

  constructor(id: string, name: string, eventHandlers?: EventHandlerInterface[]) {
    this._id = id;
    this._name = name
    this._eventDispatcher = new EventDispatcher()
    this.validate()

    this._eventDispatcher.register('CustomerCreatedEvent', new SendConsoleLog1Event())
    this._eventDispatcher.register('CustomerCreatedEvent', new SendConsoleLog2Event())
    this._eventDispatcher.register('CustomerAddressChangedEvent', new SendConsoleLogWhenAddressIsChangedHandler())

    this._eventDispatcher.notify(new CustomerCreatedEvent(this))
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  get eventDispatcher() {
    return this._eventDispatcher
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
 
  changeAddress(address: Address) {
    this._address = address

    this._eventDispatcher.notify(new CustomerAddressChangedEvent(this._address))

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