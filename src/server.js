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
      GET: [],
      POST: [],
      PUT: [],
      PATCH: [],
      DELETE: [],
    };
  }

  static getInstance() {
    if (!SingletonServer.instance) {
      SingletonServer.instance = new SingletonServer();
    }

    return SingletonServer.instance;
  }

  addEndpoint({ httpMethod, path, callback, id }) {
    const hasEndpointWithSamePath = this.endpoints[httpMethod].find(
      (endpoint) => endpoint.path === path
    );

    if (hasEndpointWithSamePath) {
      throw new Error("The provided path is already in use.");
    }

    switch (httpMethod) {
      case "POST":
        this.router.post(`/${path}`, callback);
        break;
      case "GET":
        this.router.get(`/${path}`, callback);
        break;
      case "PATCH":
        this.router.patch(`${path}/${id}`, callback);
        break;
      case "PUT":
        this.router.put(`${path}/${id}`, callback);
        break;
    }

    this.endpoints[httpMethod].push({ path, callback });
  }

  deleteEndpoint({ httpMethod, path }) {
    const endpointIndex = this.endpoints[httpMethod].findIndex(
      (endpoint) => endpoint.path === path
    );

    if (endpointIndex !== -1) {
      this.endpoints[httpMethod].splice(endpointIndex, 1);
    }
  }
}

export { SingletonServer };
