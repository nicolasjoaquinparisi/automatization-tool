import { createLogger, format, transports } from "winston";

class Logger {
  constructor({ name }) {
    this.logger = createLogger({
      level: "info",
      format: format.json(),
      transports: [new transports.File({ filename: `./logs/${name}.log` })],
    });
  }

  log(text) {
    this.logger.info(text);
  }
}

export { Logger };
