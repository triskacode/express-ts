import { IUserEntity } from "../../../domain/User";

export interface ICreateAccessTokenRequest {
  user: IUserEntity["_id"];
}
