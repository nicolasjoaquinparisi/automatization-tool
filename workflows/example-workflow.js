import { HTTPRequestNode } from "../src/nodes/HTTPRequestNode.js";
import { PostgresNode } from "../src/nodes/PostgresNode.js";

import postgresCredentials from "../src/credentials/postgres.json" assert { type: "json" };

async function main() {
  const httpRequestNode = new HTTPRequestNode({
    url: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=151",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const postgresNode = new PostgresNode({
    credentials: {
      host: postgresCredentials.host,
      port: postgresCredentials.port,
      user: postgresCredentials.user,
      password: postgresCredentials.password,
      database: postgresCredentials.database,
    },
  });

  // API Request
  const { results: pokemons } = await httpRequestNode.execute();

  // Postgres inserts
  const table = "pokemon";
  const columns = ["name"];
  const values = [pokemons[0].name];

  const result = await postgresNode.insert({ table, columns, values });

  console.log(result);
}

main();
