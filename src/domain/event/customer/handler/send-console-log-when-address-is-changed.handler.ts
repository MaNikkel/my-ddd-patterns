import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLogWhenAddressIsChangedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle({eventData}: CustomerCreatedEvent): void {
    console.log(`Endereço do cliente: ${eventData.city}, ${eventData.street}, ${eventData.number}, ${eventData.zip}`)
  }
}