const express = require("express");
const router = express.Router();
const fs = require("fs");

const pathRouter = `${__dirname}`;

const removeExtension = (filename) => {
  return filename.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithoutExt = removeExtension(file);
  const skip = ["index"].includes(fileWithoutExt);
  if (!skip) {
    router.use(`/${fileWithoutExt}`, require(`./${fileWithoutExt}`));
    console.log(`Route ---------> ${fileWithoutExt}`);
  }
});

router.get("*", (req, res) => {
  res.status(404);
  res.send({
    error: "NOT FOUND",
  });
});

module.exports = router;
