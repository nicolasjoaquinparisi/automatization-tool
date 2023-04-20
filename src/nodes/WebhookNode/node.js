import { SingletonServer } from "../../server.js";

import dotenv from "dotenv";
import { webhookSchema } from "./utils/validators.js";
dotenv.config();

class WebhookNode {
  constructor({ httpMethod, path, callback }) {
    const { error, value } = webhookSchema.validate({
      httpMethod,
      path,
      callback,
    });

    if (error) {
      throw new Error(error.details[0].message);
    }

    this.httpMethod = httpMethod;
    this.path = path;
    this.callback = callback;
  }

  async execute() {
    await SingletonServer.getInstance().addEndpoint({
      httpMethod: this.httpMethod,
      path: this.path,
      callback: this.callback,
    });

    console.log(
      `Webhook listening - Try: ${this.httpMethod} http://localhost:${process.env.PORT}/${this.path}`
    );
  }

  async stop() {
    SingletonServer.getInstance().deleteEndpoint({
      httpMethod: this.httpMethod,
      path: this.path,
    });
  }
}

export { WebhookNode };
