const AbstractManager = require("./AbstractManager");

class GameManager extends AbstractManager {
  constructor() {
    super({ table: "game" });
  }

  // The C of CRUD - Create operation

  async create({ userId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (userId) VALUES (?)`,
      [userId]
    );

    return result;
  }

  // The Rs of CRUD - Read operations
  async read(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  // The U of CRUD - Update operation

  async update({
    id,
    score,
    timeGame,
    bubblesExplosed,
    levelOxygen,
    levelOil,
    colorsUnlocked,
    userId,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET score=?, timeGame=?, bubblesExplosed=?, levelOxygen=?, levelOil=?, colorsUnlocked=?, userId=? WHERE id=?`,
      [
        score,
        timeGame,
        bubblesExplosed,
        levelOxygen,
        levelOil,
        colorsUnlocked,
        userId,
        id,
      ]
    );
    return result;
  }
}

module.exports = GameManager;
