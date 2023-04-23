import { HTTPRequestNode } from "./node.js";
import { Logger } from "../../utils/logger.js";

async function main() {
  const logger = new Logger({ name: "example" });

  const httpRequestNode = new HTTPRequestNode({
    name: "GET Pokemons",
    url: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=151",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    logger: logger,
  });

  // API Request
  await httpRequestNode.execute();
}

main();
