const logger = require("winston");

const NotFound = (req, res) => {
  const errorMessage = `Not Found: ${req.originalUrl}`;
  logger.error(errorMessage);
  res.status(404).json({ error: errorMessage });
};

module.exports = NotFound;
