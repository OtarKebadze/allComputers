const httpError = (res, error) => {
  console.log(error)
  res.status(500);
  res.send({ error: "FAILED " });
};

module.exports = { httpError };
