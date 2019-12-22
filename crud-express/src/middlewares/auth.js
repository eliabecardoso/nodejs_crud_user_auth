const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: "Usuário sem Token." });

  const [scheme, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, "secret");
    req.user = decoded.user;

    return next();  
  } catch (error) {
    return res.status(401).send({ error: "Token inválido." });
  }
};
