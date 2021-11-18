import { Express, Request, Response, NextFunction } from "express";
import { Logger } from "../config/Logger";
import { SessionController } from "../controllers/SessionController";
import { UserController } from "../controllers/UserController";
import { ValidationRequests } from "../middleware/ValidateRequest";
import { ErrorResponse } from "../responses/ErrorResponse";
import { CreateSessionValidator } from "../validations/CreateSessionValidator";
import { CreateUserValidator } from "../validations/CreateUserValidator";

export const Routes = (app: Express) => {
  app.get("/health-check", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  // create user
  app.post(
    "/users",
    ValidationRequests.validate(CreateUserValidator.rules()),
    UserController.createUser
  );

  // create session / login
  app.post(
    "/sessions",
    ValidationRequests.validate(CreateSessionValidator.rules()),
    SessionController.createSession
  );

  // error fallback
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    Logger.error(err.stack);

    return ErrorResponse.handle(res, 500);
  });
};
