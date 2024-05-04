const userControllers = require("./userControllers");
const tables = require("../tables");

const getGame = async (req, res) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    const userId = await userControllers.getByToken(token);

    const gameDataUser = await tables.game.read(userId.id);

    delete gameDataUser[0].userId;

    res.json(gameDataUser[0]);
  } catch (err) {
    console.error(err);
  }
};

const newGame = async (req, res) => {
  const { id } = req.body;

  try {
    const existingGame = await tables.game.read(id);

    if (existingGame == null) {
      res.status(404).send("Game not found");
    } else {
      const updatedGame = {
        id,
        score: 0,
        timeGame: "00:00:00",
        bubblesExplosed: 0,
        levelOxygen: 100,
        levelOil: 100,
        colorsUnlocked: 3,
        userId: existingGame[0].userId,
      };

      await tables.game.update(updatedGame);

      const existingGameUpdated = await tables.game.read(id);
      delete existingGameUpdated[0].userId;

      res.json(existingGameUpdated[0]);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getGame,
  newGame,
};
