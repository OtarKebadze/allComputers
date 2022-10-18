const logger = require("./log4js");

const httpError = (res, error) => {
  logger.error(error)
  res.status(500);
  res.send({ error: "INVALID INFORMATION" });
};

module.exports = { httpError };
