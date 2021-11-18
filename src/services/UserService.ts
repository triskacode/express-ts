import { ICreateUserRequest } from "../models/requests/user/CreateUser";
import { UserRepository } from "../repositories/UserRepository";
import { ValidationError } from "yup";
import { IValidatePasswordRequest } from "../models/requests/user/ValidatePassword";
import { IValidatePasswordPresenter } from "../models/presenters/user/ValidatePassword";
import { IFindOneUserRequest } from "../models/requests/user/FindOneUser";
import { IFindOneUserPresenter } from "../models/presenters/user/FindOneUser";

export class UserService {
  static async createUser(request: ICreateUserRequest): Promise<boolean> {
    try {
      const isAlreadyExist = await UserRepository.exists({
        email: request.email,
      });

      if (isAlreadyExist) {
        throw new ValidationError("Email already exists");
      }

      const user = await UserRepository.create({
        name: request.name,
        email: request.email,
        password: request.password,
      });

      if (!user) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  static async validatePassword(
    request: IValidatePasswordRequest
  ): Promise<IValidatePasswordPresenter> {
    try {
      const user = await UserRepository.findOneByEmail(request.email);

      if (!user) {
        throw new ValidationError("Invalid email or password");
      }

      const isMatchPassword = await user.comparePassword(request.password);

      if (!isMatchPassword) {
        throw new ValidationError("Invalid email or password");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findOneUser(
    request: IFindOneUserRequest
  ): Promise<IFindOneUserPresenter | null> {
    try {
      return await UserRepository.findOne(request);
    } catch (error) {
      throw error;
    }
  }
}
