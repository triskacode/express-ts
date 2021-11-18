import { IUserEntity } from "../../../domain/User";

export interface IValidatePasswordPresenter
  extends Omit<IUserEntity, "password"> {}
