import { ICreateUser } from "../models/requests/CreateUser";
import UserRepository from "../repositories/UserRepository";
import { ValidationError } from "yup";

class UserService {
  static async createUser(request: ICreateUser): Promise<boolean> {
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
}

export default UserService;
