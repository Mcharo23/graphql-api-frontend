export const extractErrorMessageFromConsoleLog = (log: string): string => {
  const pattern = /"originalError":\{"message":"(.*?)"/;
  const matches = log.match(pattern);

  console.log(matches);

  if (matches && matches[1]) {
    const errorMessage = matches[1];
    return errorMessage;
  }

  if (!matches) {
    const pattern = /"originalError":\{"message":\[(.*?)\]/;
    const matches = log.match(pattern);

    if (matches && matches[1]) {
      const errorMessages = JSON.parse(`[${matches[1]}]`);
      return errorMessages.join(", ");
    }
  }

  return "An error occurred";
};
