const tables = require("../tables");

const getAllBubbles = async (req, res) => {
  try {
    const gameDataAllBubbles = await tables.bubble.getAllBubbles(req.params.id);

    const allBubblesFiltered = {};

    gameDataAllBubbles.forEach((bubble) => {
      if (!allBubblesFiltered[bubble.stageLife]) {
        allBubblesFiltered[bubble.stageLife] = [];
      }
      allBubblesFiltered[bubble.stageLife].push(bubble);
    });

    res.json(allBubblesFiltered);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllBubbles,
};
