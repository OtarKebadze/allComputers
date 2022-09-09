const httpError = (res, err) => {
  res.status(500);
  res.send({ error: "FAILED " });
};

module.exports = { httpError };
