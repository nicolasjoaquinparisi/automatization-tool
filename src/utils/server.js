import express, { Router } from "express";

import dotenv from "dotenv";
dotenv.config();

class SingletonServer {
  constructor() {
    this.server = express();
    this.router = Router();

    this.server.use(express.json());
    this.server.use(this.router);

    this.server.listen(process.env.PORT, () => {});

    this.endpoints = {
      get: [],
      post: [],
      put: [],
      patch: [],
      delete: [],
    };
  }

  static getInstance() {
    if (!SingletonServer.instance) {
      SingletonServer.instance = new SingletonServer();
    }

    return SingletonServer.instance;
  }

  addEndpoint({ httpMethod, path, callback, id }) {
    const sanitizedHttpMethod = httpMethod.toLowerCase();

    const hasEndpointWithSamePath = this.endpoints[sanitizedHttpMethod].find(
      (endpoint) => endpoint.path === path
    );

    if (hasEndpointWithSamePath) {
      throw new Error("The provided path is already in use.");
    }

    switch (sanitizedHttpMethod) {
      case "post":
        this.router.post(`/${path}`, callback);
        break;
      case "get":
        this.router.get(`/${path}`, callback);
        break;
      case "patch":
        this.router.patch(`${path}/${id}`, callback);
        break;
      case "put":
        this.router.put(`${path}/${id}`, callback);
        break;
    }

    this.endpoints[httpMethod].push({ path, callback });
  }

  deleteEndpoint({ httpMethod, path }) {
    const sanitizedHttpMethod = httpMethod.toLowerCase();

    const routeIndex = this.router.stack.findIndex(
      (r) => r.route.path === `/${path}` && r.route.methods[sanitizedHttpMethod]
    );

    if (routeIndex !== -1) {
      this.router.stack.splice(routeIndex, 1);
      const endpointIndex = this.endpoints[sanitizedHttpMethod].findIndex(
        (endpoint) => endpoint.path === path
      );

      if (endpointIndex !== -1) {
        this.endpoints[sanitizedHttpMethod].splice(endpointIndex, 1);
      }
    }
  }
}

export { SingletonServer };
