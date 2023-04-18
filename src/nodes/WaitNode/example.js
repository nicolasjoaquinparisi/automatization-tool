import { WaitNode } from "./WaitNode.js";

async function main() {
  let resume = "After time interval";
  const waitAmount = 10;
  const waitUnit = "seconds";

  const waitNode = new WaitNode({
    resume: resume,
    waitAmount: waitAmount,
    waitUnit: waitUnit,
  });

  await waitNode.execute();

  console.log("Log after 10 seconds");

  resume = "At specified time";
  const dateAndTime = new Date(2023, 3, 18, 14, 0, 0); // April 18, 2023 at 14:00

  waitNode.setup({ resume: resume, dateAndTime: dateAndTime });

  await waitNode.execute();

  console.log("April 18, 2023 at 14:00");
}

main();
