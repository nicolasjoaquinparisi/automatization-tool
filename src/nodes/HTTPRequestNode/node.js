import axios from "axios";
import { httpRequestSchema } from "./utils/validators.js";

class HTTPRequestNode {
  constructor({
    name = "HTTP Request Node",
    url,
    method,
    headers,
    body,
    logger,
  }) {
    this.setup({ name, url, method, headers, body, logger });
  }

  setup({ name, url, method, headers, body, logger }) {
    const { error, value } = httpRequestSchema.validate({ url, method, body });

    if (error) {
      throw new Error(error.details[0].message);
    }

    this.name = name;

    this.axiosClient = axios.create({
      baseURL: url,
      data: body,
      headers,
      method,
    });

    if (logger) {
      this.logger = logger;
      this.logger.log(`Created ${name}.`);
    }
  }

  async execute() {
    console.log("Executing HTTP Request Node");

    try {
      const response = await this.axiosClient.request();

      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export { HTTPRequestNode };
