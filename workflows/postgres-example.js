import { PostgresNode } from "../src/nodes/PostgresNode/PostgresNode.js";

import postgresCredentials from "../src/credentials/postgres.json" assert { type: "json" };

async function main() {
  const postgresNode = new PostgresNode({
    credentials: {
      host: postgresCredentials.host,
      port: postgresCredentials.port,
      user: postgresCredentials.user,
      password: postgresCredentials.password,
      database: postgresCredentials.database,
    },
  });

  // Inserts a new row
  const table = "pokemon";
  const columns = ["name"];
  const values = ["Pikachu"];

  await postgresNode.insert({ table, columns, values });

  // Update the row with ID = 1
  postgresNode.update({
    table: "pokemon",
    set: {
      name: "test",
    },
    where: "id = 2",
  });
}

main();
