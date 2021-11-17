import { IUserEntity } from "../domain/User";
import { ICreateUserRequest } from "../models/requests/CreateUserRequest";
import UserRepository from "../repositories/UserRepository";
import Logger from "../../../config/Logger";
import { ValidationError } from "yup";

export interface IUserService {
  createUser(request: ICreateUserRequest): Promise<boolean>;
}

class UserService implements IUserService {
  async createUser(request: ICreateUserRequest): Promise<boolean> {
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

      Logger.info(user);

      if (!user) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
