import { Jwt } from "../helper/jwt";
import { ICreateAccessTokenPresenter } from "../models/presenters/session/CreateAccessToken";
import { ICreateAccessTokenRequest } from "../models/requests/session/CreateAccessToken";

export class SessionService {
  static async createAccessToken(
    request: ICreateAccessTokenRequest
  ): Promise<ICreateAccessTokenPresenter> {
    try {
      const accessToken = Jwt.sign({
        userId: request.user,
      });

      return { token: accessToken };
    } catch (error) {
      throw error;
    }
  }
}
