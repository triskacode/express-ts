import { ISessionEntity } from "../../domain/Session";

export interface ICreateSession
  extends Pick<ISessionEntity, "user" | "valid" | "userAgent"> {}
