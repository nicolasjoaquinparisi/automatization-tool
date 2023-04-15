import pkg from "pg";
const { Pool } = pkg;

class PostgresNode {
  constructor({ credentials }) {
    this.setup({ credentials });
  }

  setup({ credentials }) {
    const { user, password, host, port, database } = credentials;

    if (!user || !password || !host || !port || !database) {
      throw new Error("Invalid credentials");
    }

    this.connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;

    this.pool = new Pool({ connectionString: this.connectionString });
  }

  async executeQuery({ query }) {
    try {
      const client = await this.pool.connect();
      const result = await client.query(query);

      client.release();

      console.log(result);

      return result.rows;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async insert({ table, columns, values }) {
    try {
      const client = await this.pool.connect();

      const qColumns = columns.join(", ");
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
      const query = {
        text: `INSERT INTO ${table} (${qColumns}) VALUES (${placeholders});`,
        values: values,
      };

      const result = await client.query(query);

      client.release();

      console.log(result);

      return result.rows;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async update() {}
}

export { PostgresNode };
