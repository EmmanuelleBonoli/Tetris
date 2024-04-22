const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.user.getByPseudo(req.body.pseudo);

    if (!user[0] || !user[0].profileActive) {
      res.status(400).send("Incorrect pseudo or password");
      return;
    }

    const verified = await argon2.verify(
      user[0].hashedPassword,
      req.body.password
    );

    if (verified) {
      // Respond with the user in JSON format (but without the hashed password)
      delete user[0].hashedPassword;

      const token = await jwt.sign(
        { sub: user[0].id },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        token,
        user: user[0],
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { pseudo, email, hashedPassword, profileActive } = req.body;

    const result = await tables.user.create({
      pseudo,
      email,
      hashedPassword,
      profileActive,
    });

    if (result.insertId) {
      const newUser = {
        id: result.insertId,
        pseudo,
        email,
        hashedPassword,
        profileActive,
      };

      const token = await jwt.sign(
        { sub: newUser.id },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({
        token,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

const getByToken = async (req, res) => {
  const userInfo = req.auth;
  try {
    if (userInfo && userInfo.sub) {
      const user = await tables.user.read(userInfo.sub);

      if (user == null) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    } else {
      res.status(404).send("User not found. Auth doesn't exist");
    }
  } catch (e) {
    res.status(500).send(`Internal server error : ${e}`);
  }
};

module.exports = {
  login,
  signIn,
  getByToken,
};
