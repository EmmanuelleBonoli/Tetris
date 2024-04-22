const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create({ pseudo, email, hashedPassword, profileActive }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, email, hashedPassword, profileActive) values (?,?,?,?)`,
      [pseudo, email, hashedPassword, profileActive]
    );

    return result;
  }

  async getByPseudo(pseudo) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE pseudo = ?`,
      [pseudo]
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

  async checkExistence({ inputName, inputFirstName, inputEmail }) {
    const [result] = await this.database.query(
      `select * from ${this.table} where lastName = ? AND firstName = ? AND email = ?`,
      [inputName, inputFirstName, inputEmail]
    );
    return result;
  }
}

module.exports = UserManager;
