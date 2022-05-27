const getRandomId = (prefix: string) => (
    `${prefix}${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`
  );

export { getRandomId };
