import { NextFunction, Request, Response } from "express";
import { Logger } from "../config/Logger";
import { Jwt } from "../helper/jwt";
import { ErrorResponse } from "../responses/ErrorResponse";
import { UserService } from "../services/UserService";

export class MustAuthenticate {
  static async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = (req.get("authorization") as string).replace(
        /^Bearer\s/,
        ""
      );

      if (!accessToken) {
        return ErrorResponse.handle(res, 401);
      }

      const decodedToken = Jwt.decode(accessToken);

      if (decodedToken.valid === false && decodedToken.object === null) {
        return ErrorResponse.handle(res, 401);
      }

      // create user instance in request
      const user = await UserService.findOneUser({ _id: decodedToken.object!.userId });

      if (!user) {
        return ErrorResponse.handle(res, 401);
      }

      // @ts-ignore
      req.user = user;

      return next();
    } catch (error) {
      Logger.error(error);

      return ErrorResponse.handle(res, 500);
    }
  }
}
