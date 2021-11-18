import { IUserEntity } from "../../../domain/User";

export interface IFindOneUserRequest
  extends Partial<Pick<IUserEntity, "_id" | "email">> {}
