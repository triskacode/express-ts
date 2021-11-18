import { object, string, SchemaOf } from "yup";
import { IUserEntity } from "../domain/User";

interface ICreateSessionValidator {
  body: Pick<IUserEntity, "email" | "password">;
}

export class CreateSessionValidator {
  static rules(): SchemaOf<ICreateSessionValidator> {
    return object({
      body: object({
        email: string()
          .email("Must be a valid email")
          .required("Email is required")
          .defined("Email is required"),
        password: string()
          .required("Password is required")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .defined("Password is required"),
      }),
    }).defined("Body is required");
  }
}
