import express, { Router } from "express";
import { HTTPRequestNode } from "../src/nodes/HTTPRequestNode/node.js";

describe("Test - HTTP Request Node", () => {
  const port = 9001;
  const url = `http://127.0.0.1:${port}/api/v1/healthcheck`;

  let mockServer;
  let router;

  beforeAll(() => {
    mockServer = express();

    router = Router();
    router.get("/api/v1/healthcheck", (req, res) =>
      res.status(200).send({ msg: "Server online." })
    );

    mockServer.use(express.json());
    mockServer.use(router);

    mockServer = mockServer.listen(port, () => {});
  });

  afterAll((done) => {
    mockServer.close(done);
  });

  it("should make a successful request and return the response data", async () => {
    const node = new HTTPRequestNode({
      url: url,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return node.execute().then((response) => {
      expect(response.status).toBe(200);
      expect(response.data.msg).toBe("Server online.");
    });
  });

  it("should handle request errors and return the error", async () => {
    const node = new HTTPRequestNode({
      url: `http://127.0.0.1:${port}/api/v1/not-found`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return node.execute().then(({ response }) => {
      expect(response.status).toBe(404);
    });
  });
});
