import { object, string, ref, SchemaOf } from "yup";
import { IUserEntity } from "../domain/User";

type ICreateUserValidator = {
  body: Pick<IUserEntity, "email" | "name" | "password">;
};

class CreateUserValidator {
  handler(): SchemaOf<ICreateUserValidator> {
    return object({
      body: object({
        name: string().required("Name is required").defined(),
        password: string()
          .required("Password is required")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(
            /^[a-zA-Z0-9_.-@]*$/,
            "Password can only contain Latin letters or number."
          )
          .defined(),
        passwordConfirmation: string()
          .oneOf([ref("password"), null], "Passwords must match"),
        email: string()
          .email("Must be a valid email")
          .required("Email is required")
          .defined(),
      }),
    }).defined();
  }
}

export default new CreateUserValidator().handler();
