import pino from "pino";
import dayjs from "dayjs";

export const Logger = pino({
  base: {
    pid: false,
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});