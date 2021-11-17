import mongoose, { Document } from "mongoose";
import { IUserDocument } from "./User";

export interface ISessionEntity {
  _id?: mongoose.Schema.Types.ObjectId;
  user: IUserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISessionDocument
  extends ISessionEntity,
    Omit<Document, keyof ISessionEntity> {}
