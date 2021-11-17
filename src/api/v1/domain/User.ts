import { Document } from "mongoose";

export interface IUserEntity {
  _id?: string;
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument
  extends IUserEntity,
    Omit<Document, keyof IUserEntity> {}
