import { WebhookNode } from "./node.js";
import { HTTPRequestNode } from "../HTTPRequestNode/node.js";

async function webhookCallback(req, res) {
  console.log("Executing webhook");

  // Http Request node config
  const url = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=151";
  const method = "GET";
  const headers = {
    "Content-Type": "application/json",
  };

  const httpRequestNode = new HTTPRequestNode({
    url: url,
    method: method,
    headers: headers,
  });

  const { results: pokemons } = await httpRequestNode.execute();

  res.status(200).send({ pokemons });
}

function main() {
  const webhook = new WebhookNode({
    httpMethod: "GET",
    path: "pokemons",
    callback: webhookCallback,
  });

  webhook.execute();
}

main();
