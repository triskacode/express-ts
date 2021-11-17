import config from "config";
import express from "express";
import pino from "express-pino-logger";
import P from "pino-http/node_modules/@types/pino";
import Logger from "./config/Logger";
import Routes from "./routes/Routes";
import Database from "./config/Database";

const host = config.get("Server.host") as string;
const port = config.get("Server.port") as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pino({ logger: Logger as P.Logger }));

app.listen(port, host, () => {
  Logger.info(`Server staring on ${host}:${port}`);

  Database();
  Routes(app);
});
