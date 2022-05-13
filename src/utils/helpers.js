module.exports = {
  getRandomId: (prefix) => (
    `${prefix}${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`
  ),
  getValidKeys: (object) => (
    Object.fromEntries(
      Object.entries(object).filter((entry) => entry[1]),
    )
  ),
};
