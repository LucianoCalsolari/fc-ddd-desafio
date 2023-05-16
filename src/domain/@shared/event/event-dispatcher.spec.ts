import CustomerChangedEvent from "../../customer/event/customer-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendLogWhenCustomerIsChangedHandler from "../../customer/event/handler/send-log-when-customer-is-changed";
import SendLogWhenCustomerIsCreatedHandler from "../../customer/event/handler/send-log-when-customer-is-created.handler";
import SendLogWhenCustomerIsCreated2Handler from "../../customer/event/handler/send-log-when-customer-is-created2.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

//SendLogWhenCustomerIsCreatedHandler
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendLogWhenCustomerIsCreated2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      2
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });


  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendLogWhenCustomerIsCreated2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      1
    );
  });


  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendLogWhenCustomerIsCreated2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendLogWhenCustomerIsCreated2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      address: "Address 1",
    });

    // Quando o notify for executado o SendLogWhenCustomerIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

//SendLogWhenCustomerIsChangedHandler
it("should register an event handler", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new SendLogWhenCustomerIsChangedHandler();

  eventDispatcher.register("CustomerChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerChangedEvent"]
  ).toBeDefined();
  expect(eventDispatcher.getEventHandlers["CustomerChangedEvent"].length).toBe(
    1
  );
  expect(
    eventDispatcher.getEventHandlers["CustomerChangedEvent"][0]
  ).toMatchObject(eventHandler);
});


it("should unregister an event handler", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new SendLogWhenCustomerIsChangedHandler();

  eventDispatcher.register("CustomerChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerChangedEvent"][0]
  ).toMatchObject(eventHandler);

  eventDispatcher.unregister("CustomerChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerChangedEvent"]
  ).toBeDefined();
  expect(eventDispatcher.getEventHandlers["CustomerChangedEvent"].length).toBe(
    0
  );
});


it("should unregister all event handlers", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new SendLogWhenCustomerIsChangedHandler();

  eventDispatcher.register("CustomerChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerChangedEvent"][0]
  ).toMatchObject(eventHandler);

  eventDispatcher.unregisterAll();

  expect(
    eventDispatcher.getEventHandlers["CustomerChangedEvent"]
  ).toBeUndefined();
});

it("should notify all event handlers", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new SendLogWhenCustomerIsChangedHandler();
  const spyEventHandler = jest.spyOn(eventHandler, "handle");

  eventDispatcher.register("CustomerChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerChangedEvent"][0]
  ).toMatchObject(eventHandler);

  const customerChangedEvent = new CustomerChangedEvent({
    name: "Customer 1",
    address: "Address 1",
  });

  // Quando o notify for executado o SendLogWhenCustomerIsCreatedHandler.handle() deve ser chamado
  eventDispatcher.notify(customerChangedEvent);

  expect(spyEventHandler).toHaveBeenCalled();
});
});
