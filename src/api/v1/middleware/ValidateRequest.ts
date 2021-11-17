import { NextFunction, Request, Response } from "express";
import { AnySchema, ValidationError } from "yup";
import Logger from "../../../config/Logger";
import { ValidationErrorResponse } from "../models/responses/ValidationErrorResponse";

export class ValidationRequests {
  static validate(schema: AnySchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validate({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        return next();
      } catch (_error) {
        const error = _error as ValidationError;

        Logger.error(error);
        return ValidationErrorResponse.handle(res, error.errors);
      }
    };
  }
}
