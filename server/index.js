const accountController = require("./api/account");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const boddParser = require("body-parser");
const passport = require("passport");
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(boddParser.json());
app.use(boddParser.urlencoded({ extended: true }));
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser("secret"));

app.use(passport.initialize());
app.use(passport.session());
require("./lib/passportConfig")(passport);

app.get("/", (req, res) => {
  res.send("Slytherin");
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.send({ error: { message: "Invalid username or password" } });
    }
    if (user) {
      req.login(user, (err) => {
        if (err) {
          throw err;
        }
        delete user.password;
        res.send({
          success: { message: "User logged in" },
          user,
        });
      });
    }
  })(req, res, next);
});

app.post("/createstudent", async (req, res) => {
  try {
    await accountController.create_student(req, res);
  } catch (error) {
    console.log(error);
  }
});

app.post("/createprofessor", async (req, res) => {
  try {
    await accountController.create_professor(req, res);
  } catch (error) {
    console.log(error);
  }
});

app.post("/changepassword", async (req, res) => {
  const login = req.body.login;
  const password = req.body.pass;

  const query =
    "UPDATE cathedra_slytherin.accounts SET password = ? WHERE (login = ?);";

  const hashedPassword = bcrypt.hashSync(password.toString(), 10);
  db.query(query, [hashedPassword, login], (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "Password changed success" });
  });
});

app.get("/subjects", async (req, res) => {
  const query = "SELECT * FROM cathedra_slytherin.subjects";
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/getsubjectbycourse", async (req, res) => {
  let query = null;

  if (req.body.course) {
    query = "SELECT * FROM cathedra_slytherin.subjects WHERE course = ?";
  } else {
    query = "SELECT * FROM cathedra_slytherin.subjects";
  }

  db.query(query, [req.body.course], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/allstudents", async (req, res) => {
  const query =
    "SELECT login, name, surname, date FROM cathedra_slytherin.accounts WHERE role = 'student'";
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/getexamsdate", async (req, res) => {
  const query = "SELECT * FROM cathedra_slytherin.exams_shedules";
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/allprofessors", async (req, res) => {
  const query = "SELECT * FROM cathedra_slytherin.professors";
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/getteacher", async (req, res) => {
  const query =
    "SELECT * FROM cathedra_slytherin.professors WHERE name = (?) and surname = (?)";
  db.query(query, [req.body.name, req.body.surname], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/getstudentmarks", async (req, res) => {
  const query =
    "SELECT * FROM cathedra_slytherin.marks WHERE student_login = (?)";
  db.query(query, [req.body.login], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/getallmarks", async (req, res) => {
  const query = "SELECT * FROM cathedra_slytherin.marks ";
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/addmark", async (req, res) => {
  const query3 =
    "UPDATE cathedra_slytherin.marks SET `value` = ? WHERE (`id` = ?);";
  const query2 =
    "SELECT * FROM cathedra_slytherin.marks WHERE `student_login` = ? and `subject_name` = ?";
  const query =
    "INSERT INTO cathedra_slytherin.marks (`subject_name`, `student_login`, `value`) VALUES (?, ?, ?);";

  db.query(
    query2,
    [req.body.student_login, req.body.subject_name],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        const id = result[0].id;
        db.query(query3, [req.body.value, id], (err, result) => {
          if (err) {
            throw err;
          }
          res.send("Mark record updated");
        });
      }
      if (result.length === 0) {
        db.query(
          query,
          [req.body.subject_name, req.body.student_login, req.body.value],
          (err, result) => {
            if (err) {
              throw err;
            }
            res.send("Mark record success");
          }
        );
      }
    }
  );
});

app.post("/getmarksbysubject", async (req, res) => {
  const query = "SELECT * FROM cathedra_slytherin.marks WHERE subject_name = ?";
  db.query(query, [req.body.subject], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/getposts", async (req, res) => {
  const query =
    "SELECT * FROM cathedra_slytherin.news_posts ORDER BY id DESC LIMIT 6";
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/getpost", async (req, res) => {
  const query = "SELECT * FROM cathedra_slytherin.news_posts WHERE id = ?";
  db.query(query, [req.body.post_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
