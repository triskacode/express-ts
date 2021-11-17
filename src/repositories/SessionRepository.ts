import { SessionModel } from "../databases/schemas/SessionSchema";
import { ISessionDocument, ISessionEntity } from "../domain/Session";

class SessionRepository {
  static async create(session: ISessionEntity): Promise<ISessionDocument> {
    return await SessionModel.create(session);
  }
  static async findOneByUserId(
    id: ISessionEntity["user"]
  ): Promise<ISessionDocument | null> {
    return await SessionModel.findOne({ user: id }).exec();
  }
}

export default SessionRepository;