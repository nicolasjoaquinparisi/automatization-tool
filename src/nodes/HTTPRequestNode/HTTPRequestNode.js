import axios from "axios";
import { httpRequestSchema } from "./validators.js";

class HTTPRequestNode {
  constructor({ url, method, headers, body }) {
    this.setup({ url, method, headers, body });
  }

  setup({ url, method, headers, body }) {
    const { error, value } = httpRequestSchema.validate({ url, method, body });

    if (error) {
      throw new Error(error.details[0].message);
    }

    this.axiosClient = axios.create({
      baseURL: url,
      data: body,
      headers,
      method,
    });
  }

  async execute() {
    try {
      const response = await this.axiosClient.request();

      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export { HTTPRequestNode };
