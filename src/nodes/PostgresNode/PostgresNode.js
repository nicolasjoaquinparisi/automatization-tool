import pkg from "pg";
const { Pool, QueryResult } = pkg;

import { updateSchema } from "./utils/validators.js";

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

  /**
   * Inserts a new row
   *
   * @param {String} table The name of the table.
   *
   * @param {Array} columns An array of strings that contains the name of the columns that will be setted up.

   * @param {Array} values An array of strings that contains the values that will be inserted.
   *
   * @returns {QueryResult} The executed query result.
   */
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

  /**
   * Updates a row
   *
   * @param {String} table The name of the table.
   *
   * @param {Object} set An object that contains as keys the names of the columns and as values the data that will be used to update the columns

   * @param {String} where A string that contains the conditions
   *
   * @returns {QueryResult} The executed query result.
   */
  async update({ table, set, where }) {
    try {
      const validation = updateSchema.validate({ table, set, where });

      if (validation.error) {
        throw new Error(validation.error);
      }

      const client = await this.pool.connect();

      const setValues = Object.keys(set)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ");

      const query = {
        text: `UPDATE ${table} SET ${setValues} WHERE ${where}`,
        values: Object.values(set),
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
}

export { PostgresNode };
