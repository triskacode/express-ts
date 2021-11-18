import { UserModel } from "../databases/schemas/UserSchema";
import { IUserDocument, IUserEntity } from "../domain/User";

export class UserRepository {
  static async create(user: IUserEntity): Promise<IUserDocument> {
    return await UserModel.create(user);
  }

  static async exists(
    user: Pick<IUserEntity, "_id" | "email">
  ): Promise<boolean> {
    return await UserModel.exists(user);
  }

  static async findOne(
    filter: Partial<Pick<IUserEntity, "_id" | "email">>
  ): Promise<IUserDocument | null> {
    return await UserModel.findOne(filter).exec();
  }

  static async findOneByEmail(
    email: IUserEntity["email"]
  ): Promise<IUserDocument | null> {
    return await UserModel.findOne({ email }).exec();
  }
}
