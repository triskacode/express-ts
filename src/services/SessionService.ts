import { ISessionDocument } from "../domain/Session";
import { ICreateSession } from "../models/requests/CreateSession";
import SessionRepository from "../repositories/SessionRepository";

class SessionService {
  static async createAccessToken(
    request: ICreateSession
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let session = SessionRepository.findOneByUserId(request.user);

    if (!session) {
      session = SessionRepository.create({
        user: request.user,
        valid: request.valid,
        userAgent: request.userAgent,
      });
    }

    // create token
    return;
  }
}

export default SessionService;
