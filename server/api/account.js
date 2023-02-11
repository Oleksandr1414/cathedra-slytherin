const bcrypt = require("bcrypt");
const db = require("./../db");

class AccountController {
  constructor() {}

  async create_student(req, res) {
    const login = req.body.login;
    const password = req.body.password;

    const query =
      "INSERT INTO accounts (`login`, `password`, `name`, `surname`, `email`, `role`, `date`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const query2 = "SELECT * FROM accounts WHERE login = ?";

    db.query(query2, [login], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        res.send({
          error: { message: "Account with this login already exists" },
        });
      }
      if (result.length === 0) {
        const hashedPassword = bcrypt.hashSync(password.toString(), 10);
        const insertParams = Object.values(req.body);
        insertParams[1] = hashedPassword;
        db.query(query, insertParams, (err, result) => {
          if (err) {
            throw err;
          }
          res.send({ message: "Account created" });
        });
      }
    });
  }

  async create_professor(req, res) {
    try {
      const login = req.body.login;
      const password = req.body.password;
      const query =
        "INSERT INTO accounts (`login`, `password`, `name`, `surname`, `email`, `role`, `date`) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const query2 = "SELECT * FROM accounts WHERE login = ?";
      const query3 =
        "INSERT INTO professors (`name`, `surname`, `subject`, `description`) VALUES (?, ?, ?, ?)";

      db.query(query2, [login], (err, result) => {
        if (err) {
          throw err;
        }
        if (result.length > 0) {
          res.send({
            error: { message: "Account with this login already exists" },
          });
          return;
        }
        if (result.length === 0) {
          const hashedPassword = bcrypt.hashSync(password.toString(), 10);
          const insertParams = Object.values(req.body);
          insertParams[1] = hashedPassword;
          db.query(query, insertParams, (err, result) => {
            if (err) {
              throw err;
            }
            const data = req.body;
            const insertParams = [
              data.name,
              data.surname,
              data.subject,
              data.description,
            ];

            db.query(query3, insertParams, (err, result) => {
              if (err) {
                throw err;
              }
              res.send({ message: "Professor record created" });
            });
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

const accountController = new AccountController();
module.exports = accountController;
