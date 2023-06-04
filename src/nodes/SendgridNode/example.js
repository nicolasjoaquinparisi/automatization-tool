import { SengridNode } from "./node.js";

async function main() {
  const node = new SengridNode({
    to: "to-email@mail.com",
    from: "from-email@mail.com",
    subject: "test subject",
    text: "test",
  });

  await node.execute();
}

main();
