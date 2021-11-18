import { IUserEntity } from "../../../domain/User";

export interface IValidatePasswordRequest
  extends Pick<IUserEntity, "email" | "password"> {}
