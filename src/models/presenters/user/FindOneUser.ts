import { IUserEntity } from "../../../domain/User";

export interface IFindOneUserPresenter
  extends Omit<IUserEntity, "password"> {}
