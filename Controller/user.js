const db = require("../Entity");
const users = db.users;
const bcrypt = require("bcryptjs");
const { createToken, decodeToken } = require("../config/jwtConfig");
const create = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.password && req.body.email) {
      let { fullName, password, email } = req.body;
      email = email.toLowerCase();
      if (email.endsWith("@jmangroup.com")) {
        await users.create({
          fullName,
          email,
          password,
        });
    
        res.send({ status: 200, message: "Signup successful" });
      } else {
        res.status(400).send("invalid email");
      }
    } else {
      res.status(400).send({ message: "Not added to the database!" });
    }
  } catch (error) {
    res.status(500).send({ status: 400, message: "Error sign-up" });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    let myData;
    let user;

    user = await users.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      let isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        let token = await createToken(user);

        res.send({
          statusCode: 200,
          message: "Login successful",
          token,
          role: user.role,
          email: user.email,
          name: user.fullName,
        });
      } else {
        res.status(400).send({ message: "Wrong password" });
      }
    } else {
      res.status(400).send({ message: "Not registered!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error logging " });
  }
};

const validateUser = async (req, res) => {
  let token = await req.headers.authorization.split(" ")[1];
  let decodeMyToken = await decodeToken(token);
  const email = decodeMyToken.email;
  let getData = await users.findOne({
    where: {
      email: email,
    },
  });
  if (getData) {
    
    res.status(200).send({ message:"Authorized" });
  } else {
    res.status(400).send({ message: "Invalid user" });
  }
};


module.exports = {
  create,
  login,
  validateUser,
};
