import { IUserEntity } from "../../../domain/User";

export interface ICreateUserRequest
  extends Pick<IUserEntity, "name" | "email" | "password"> {}
