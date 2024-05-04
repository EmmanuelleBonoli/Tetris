const AbstractManager = require("./AbstractManager");

class BubbleManager extends AbstractManager {
  constructor() {
    super({ table: "bubble" });
  }

  // The C of CRUD - Create operation

  //   async create({ userId }) {
  //     const [result] = await this.database.query(
  //       `INSERT INTO ${this.table} (userId) VALUES (?)`,
  //       [userId]
  //     );

  //     return result;
  //   }

  // The Rs of CRUD - Read operations
  async getAllBubbles(id) {
    const [result] = await this.database.query(
      `select bubble.id, bubble.stageLife, bubble.color, bubble.positionLine, bubble.positionColumn, bubble.bubblesMatch, bubble.bubblePartner, bubble.gameId from ${this.table} 
      JOIN game on ${this.table}.gameId = game.id
      where game.id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = BubbleManager;
