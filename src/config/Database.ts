import config from "config";
import mongoose, { MongooseOptions } from "mongoose";
import { Logger } from "./Logger";

export const Database = () => {
  const dbUri = config.get("Database.mongo.uri") as string;
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongooseOptions;

  return mongoose
    .connect(dbUri, dbOptions)
    .then(() => {
      Logger.info("Database connected");
    })
    .catch((error) => {
      Logger.error("Cannot connect to database", error);
      process.exit(1);
    });
};
