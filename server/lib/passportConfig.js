const db = require("../db");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      const query =
        "SELECT * FROM cathedra_slytherin.accounts where login = ? ";
      db.query(query, [username], (err, result) => {
        if (err) {
          throw err;
        }
        if (result.length === 0) {
          return done(null, false);
        }
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (err) {
            throw err;
          }
          if (response === true) {
            return done(null, result[0]);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const query = "SELECT * FROM cathedre-slytherin.accounts where id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        throw err;
      }
      const userInfo = {
        id: result[0].id,
        login: result[0].login,
      };
      done(null, userInfo);
    });
  });
};
