import { IUserEntity } from "../../domain/User";

export interface ICreateUser
  extends Pick<IUserEntity, "name" | "email" | "password"> {}
