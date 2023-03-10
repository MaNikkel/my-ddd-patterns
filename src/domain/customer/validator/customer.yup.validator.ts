import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup";
import { NotificationError } from "../../@shared/notification/notification.error";

export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    const schema = yup.object().shape({
      id: yup.string().required("Id is required"),
      name: yup.string().required("Name is required"),
    });

    try {
      schema.validateSync(entity, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.map((err) => ({
          message: err.message,
          context: "Customer",
        }));

        throw new NotificationError(errors);
      }
    }
  }
}