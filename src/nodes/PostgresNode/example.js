import { PostgresNode } from "./PostgresNode.js";

const POSTGRES_CREDENTIALS = {
  host: "postgres",
  database: "db",
  user: "root",
  password: 12345,
  port: 5432,
};

async function main() {
  const postgresNode = new PostgresNode({
    credentials: {
      host: POSTGRES_CREDENTIALS.host,
      port: POSTGRES_CREDENTIALS.port,
      user: POSTGRES_CREDENTIALS.user,
      password: POSTGRES_CREDENTIALS.password,
      database: POSTGRES_CREDENTIALS.database,
    },
  });

  // Inserts a new row
  const table = "pokemon";
  const columns = ["name"];
  const values = ["Pikachu"];

  await postgresNode.insert({ table, columns, values });

  // Update the row with ID = 2
  postgresNode.update({
    table: "pokemon",
    set: {
      name: "test",
    },
    where: "id = 2",
  });
}

main();
