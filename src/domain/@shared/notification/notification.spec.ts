import { Notification } from "./notification";

describe("Unit tests for notifications", () => {
  it("should create an error", () => {
    const notification = new Notification();

    const error = {
      message: "test",
      context: "customer",
    }

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: test,");

    const error2 = {
      message: "test2",
      context: "customer",
    }

    notification.addError(error2);

    expect(notification.messages("customer")).toBe("customer: test,customer: test2,");

    const error3 = {
      message: "test3",
      context: "order",
    }

    notification.addError(error3);

    expect(notification.messages("customer")).toBe("customer: test,customer: test2,");
    expect(notification.messages()).toBe("customer: test,customer: test2,order: test3,");


  });

  it('should check if notification has errors', () => {
    const notification = new Notification();

    const error = {
      message: "test",
      context: "customer",
    }

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  })

  it('should get all error props', () => {
    const notification = new Notification();

    const error = {
      message: "test",
      context: "customer",
    }

    notification.addError(error);

    expect(notification.errors).toEqual([error]);
  })
})