import { HTTPRequestNode } from "./HTTPRequestNode.js";

async function main() {
  const httpRequestNode = new HTTPRequestNode({
    url: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=151",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // API Request
  const { results: pokemons } = await httpRequestNode.execute();

  console.log(pokemons);
}

main();
