import { Express, Request, Response, NextFunction, response } from "express";
import { Logger } from "../config/Logger";
import { SessionController } from "../controllers/SessionController";
import { UserController } from "../controllers/UserController";
import { MustAuthenticate } from "../middleware/MustAuthenticate";
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

  // route test must login
  app.get("/test", MustAuthenticate.handler, (req: Request, res: Response) => {
    // @ts-ignore
    Logger.info(req.user);

    return res.sendStatus(200);
  });

  // error fallback
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    Logger.error(err.stack);

    return ErrorResponse.handle(res, 500);
  });
};
