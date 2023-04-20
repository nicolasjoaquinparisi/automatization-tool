import { waitNodeSchema } from "./utils/validators.js";
import { calculateWaitTime } from "./utils/functions.js";

class WaitNode {
  constructor({ resume, waitUnit, waitAmount, dateAndTime }) {
    this.setup({ resume, waitUnit, waitAmount, dateAndTime });
  }

  setup({ resume, waitUnit, waitAmount, dateAndTime }) {
    const { error } = waitNodeSchema.validate({
      resume,
      waitUnit,
      waitAmount,
      dateAndTime,
    });
    if (error) {
      throw new Error(error.details[0].message);
    }

    switch (resume) {
      case "After time interval":
        this.waitTime = calculateWaitTime(waitUnit, waitAmount);
        break;
      case "At specified time":
        const currentTime = new Date();
        const timeDifference = dateAndTime.getTime() - currentTime.getTime();
        if (timeDifference < 0) {
          throw new Error("Invalid dateAndTime value");
        }

        this.waitTime = timeDifference;
        break;
    }
  }

  async execute() {
    console.log("Executing Wait Node");

    return await new Promise((resolve) => setTimeout(resolve, this.waitTime));
  }
}

export { WaitNode };
