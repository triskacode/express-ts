import { IUserDocument } from "./User";

export interface IAccessTokenObject {
  userId: IUserDocument["_id"];
}