import { ISessionEntity } from "../../../domain/Session";

export interface ICreateAccessTokenRequest
  extends Pick<ISessionEntity, "user" | "valid" | "userAgent"> {}
