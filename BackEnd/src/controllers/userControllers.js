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
          expiresIn: "24h",
        }
      );

      res.json({
        token,
        user: user[0].profileActive,
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
          expiresIn: "24h",
        }
      );

      const createNewGame = await tables.game.create({
        userId: result.insertId,
      });

      const newGame = await tables.game.read(createNewGame.insertId);

      res.status(201).json({
        token,
        newGame: newGame[0],
      });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

// const getByToken = async (req, res) => {
//   const userInfo = req.auth;
//   console.log("userInfo",userInfo)
//   try {
//     if (userInfo && userInfo.sub) {
//       const user = await tables.user.read(userInfo.sub);

//       if (user == null) {
//         res.sendStatus(404);
//       } else {
//         res.json(user);
//       }
//     } else {
//       res.status(404).send("User not found. Auth doesn't exist");
//     }
//   } catch (e) {
//     res.status(500).send(`Internal server error : ${e}`);
//   }
// };

const getByToken = async (token) => {
  if (!token) {
    throw new Error("Token missing");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.APP_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }

  if (!decodedToken.sub) {
    throw new Error("Invalid token");
  }

  const user = await tables.user.read(decodedToken.sub);
  if (!user) {
    throw new Error("User not found");
  }

  return user[0];
};

const checkValidityToken = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.send(false);
  }

  try {
    const decodedToken = jwt.verify(
      token.split(" ")[1],
      process.env.APP_SECRET
    );

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      return res.send(false);
    }

    return res.send(true);
  } catch (error) {
    // Si une erreur se produit lors de la vérification du token, cela peut être dû à une expiration
    if (error.name === "TokenExpiredError") {
      return res.send(false);
    }
    // Gérer d'autres erreurs de vérification de token ici
    console.error(error);
    return res.send(false);
  }
};

module.exports = {
  login,
  signIn,
  getByToken,
  checkValidityToken,
};
