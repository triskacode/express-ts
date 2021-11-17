import { UserModel } from "../databases/schemas/UserSchema";
import { IUserDocument, IUserEntity } from "../domain/User";

class UserRepository {
  static async create(user: IUserEntity): Promise<IUserDocument> {
    return await UserModel.create(user);
  }

  static async exists(
    user: Pick<IUserEntity, "_id" | "email">
  ): Promise<boolean> {
    return await UserModel.exists(user);
  }
}

export default UserRepository;
