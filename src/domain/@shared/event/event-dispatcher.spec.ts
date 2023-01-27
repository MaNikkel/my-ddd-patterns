import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBeInstanceOf(SendEmailWhenProductIsCreatedHandler)
  })

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBeInstanceOf(SendEmailWhenProductIsCreatedHandler)

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler)
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    
  })
  it('should unregister all event handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBeInstanceOf(SendEmailWhenProductIsCreatedHandler)

    eventDispatcher.unregisterAll()
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).not.toBeDefined();
    expect(eventDispatcher.getEventHandlers).toStrictEqual({})
    
  })

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    const eventHandlerSpy = jest.spyOn(eventHandler, 'handle')

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product",
      description: "Product",
      price: 1
    })

    eventDispatcher.notify(productCreatedEvent)

    expect(eventHandlerSpy).toHaveBeenCalled()
    expect(eventHandlerSpy).toHaveBeenCalledTimes(1)

  })
})