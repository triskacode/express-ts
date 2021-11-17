import mongoose, { Document } from "mongoose";

export interface IUserEntity {
  _id?: mongoose.Schema.Types.ObjectId;
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument
  extends IUserEntity,
    Omit<Document, keyof IUserEntity> {}

export interface IUserPresenter
  extends Required<Omit<IUserEntity, "password">> {}
