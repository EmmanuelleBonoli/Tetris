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

const updatedBubble = async (req, res) => {
  const {
    id,
    stageLife,
    color,
    positionLine,
    positionColumn,
    bubblesMatch,
    bubblePartner,
    gameId,
  } = req.body;
  try {
    const existingBubble = await tables.bubble.read(id);

    if (existingBubble == null) {
      res.status(404).send("Bubble not found");
    } else {
      const updatedBubbleObject = {
        id,
        stageLife,
        color,
        positionLine,
        positionColumn,
        bubblesMatch,
        bubblePartner,
        gameId,
      };

      const updatedBubbleData = await tables.bubble.update(updatedBubbleObject);

      res.json(updatedBubbleData);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllBubbles,
  updatedBubble,
};
