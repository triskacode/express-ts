import { object, string, ref, SchemaOf } from "yup";
import { IUserEntity } from "../domain/User";

type ICreateUserValidator = {
  body: Pick<IUserEntity, "email" | "name" | "password">;
};

class CreateUserValidator {
  static rules(): SchemaOf<ICreateUserValidator> {
    return object({
      body: object({
        name: string().required("Name is required").defined("Name is required"),
        email: string()
          .email("Must be a valid email")
          .required("Email is required")
          .defined("Email is required"),
        password: string()
          .required("Password is required")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .defined("Password is required"),
        passwordConfirmation: string()
          .oneOf([ref("password"), null], "Passwords must match")
          .defined("Password confirmation is required"),
      }),
    }).defined("Body is required");
  }
}

export default CreateUserValidator;
