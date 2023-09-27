const jwt = require("jsonwebtoken");
const saltRound = 10;
const secretKey = "boostisthesecretofmyenergy";

const createToken = async ({ email, fullName, role }) => {
  console.log(email, fullName, role);
  let token = await jwt.sign({ email, fullName, role }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};
const decodeToken = async (token) => {
  return await jwt.decode(token);
};

const validate = async (req, res, next) => {
  try {

    if (req.headers.authorization) {
      
      let token = await req.headers.authorization.split(" ")[1];
  
      let myDecodeToken = await decodeToken(token);

      if (myDecodeToken) {
        next();
      } else {
        res.status(400).send({ message: "Login again" });
      }
    } else {
      res.status(400).send({ message: "Token is missing" });
    }
  } catch (error) {
    res.status(400).send({ message: "error login" });
  }
};

module.exports = {
  createToken,
  validate,
  decodeToken,
};
