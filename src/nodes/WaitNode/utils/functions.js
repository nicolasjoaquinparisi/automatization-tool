function calculateWaitTime(waitUnit, waitAmount) {
  switch (waitUnit) {
    case "milliseconds":
      return waitAmount;
    case "seconds":
      return waitAmount * 1000;
    case "minutes":
      return waitAmount * 1000 * 60;
    case "hours":
      return waitAmount * 1000 * 60 * 60;
    default:
      throw new Error("Invalid waitUnit value");
  }
}

export { calculateWaitTime };
