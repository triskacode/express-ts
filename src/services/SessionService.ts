import { Jwt } from "../helper/jwt";
import { ICreateAccessTokenPresenter } from "../models/presenters/session/CreateAccessToken";
import { ICreateAccessTokenRequest } from "../models/requests/session/CreateAccessToken";
import { SessionRepository } from "../repositories/SessionRepository";

export class SessionService {
  static async createAccessToken(
    request: ICreateAccessTokenRequest
  ): Promise<ICreateAccessTokenPresenter> {
    try {
      let session = await SessionRepository.findOneByUserId(request.user);

      if (!session) {
        session = await SessionRepository.create({
          user: request.user,
          valid: request.valid,
          userAgent: request.userAgent,
        });
      }

      // create token by default expires reference on config Session.expiresToken
      const accessToken = Jwt.sign({
        userId: session.user,
      });

      return { token: accessToken };
    } catch (error) {
      throw error;
    }
  }
}
