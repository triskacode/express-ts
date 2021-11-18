import config from "config";
import jwt, { SignOptions } from "jsonwebtoken";
import { Logger } from "../config/Logger";
import { IAccessTokenObject } from "../domain/Session";

export class Jwt {
  private static privateKey: string = config.get("Session.privateKey");
  private static expiredToken: string = config.get("Session.expiredToken");

  static sign(object: IAccessTokenObject, options?: SignOptions): string {
    return jwt.sign(
      object,
      this.privateKey,
      options || { expiresIn: this.expiredToken }
    );
  }

  static verify(token: string): { valid: boolean; object: IAccessTokenObject | null } {
    try {
      const decoded = jwt.verify(token, this.privateKey);

      return {
        valid: true,
        object: decoded as IAccessTokenObject,
      };
    } catch (error) {
      Logger.info(error);

      return {
        valid: false,
        object: null,
      };
    }
  }
}
