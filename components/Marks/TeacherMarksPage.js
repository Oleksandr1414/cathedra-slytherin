import React from "react";
import axios from "axios";
import getCourse from "../../utils/getCourse.js";
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Input,
  Row,
  Table,
  Text,
} from "@nextui-org/react";

export default function TeacherMarksPage({ user }) {
  const [teacher, setTeacher] = React.useState(null);
  const [students, setStudents] = React.useState([]);
  const [markValue, setMarkValue] = React.useState(null);
  const [currentStudent, setCurrentStudent] = React.useState(null);
  const [marks, setMarks] = React.useState(null);

  const [updateData, setUpdateData] = React.useState(true);

  const studentsObject = React.useMemo(() => {
    const obj = {};
    students.forEach((s) => {
      obj[s.login] = {
        name: s.name + " " + s.surname,
        course: getCourse(s.date),
      };
    });
    return obj;
  }, [students]);

  const [course, setCourse] = React.useState("1");
  const resultStudentArr = React.useMemo(() => {
    return students.filter(
      (s) =>
        s.course === parseInt(course) ||
        s.course === parseInt(course.currentKey)
    );
  }, [course, students]);

  const coursesList = ["1", "2", "3", "4", "5", "6", "7"];
  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/allstudents",
    })
      .then((res) => {
        const data = res.data.map((obj) => {
          obj["course"] = getCourse(obj.date);
          return obj;
        });
        setStudents(data);
      })
      .catch((err) => console.log(err));

    if (user) {
      axios({
        method: "post",
        data: { name: user.name, surname: user.surname },
        withCredentials: true,
        url: "http://localhost:3001/getteacher",
      })
        .then((res) => {
          setTeacher(res.data[0]);
          axios({
            method: "post",
            data: { subject: res.data[0].subject },
            withCredentials: true,
            url: "http://localhost:3001/getmarksbysubject",
          })
            .then((res) => {
              const obj = {};
              res.data.forEach((o) => {
                obj[o.student_login] = o.value;
              });
              setMarks(obj);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [user, updateData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!teacher) {
      alert("Помилка сервера");
      return;
    }

    if (!markValue) {
      alert("Введіть оцінку");
      return;
    }

    if (!currentStudent) {
      alert("Виберіть студента");
      return;
    }

    let response = null;
    try {
      response = await axios({
        method: "post",
        data: {
          subject_name: teacher.subject,
          student_login: currentStudent.currentKey,
          value: markValue,
        },
        withCredentials: true,
        url: "http://localhost:3001/addmark",
      });
    } catch (err) {
      alert(err.message);
      return;
    }

    if (response?.data?.error?.message) {
      alert(response?.data?.error.message);
      return;
    } else {
      setMarkValue(null);
      setCurrentStudent(null);
      document.getElementById("add_mark").reset();
      setUpdateData(updateData ? false : true);
    }
  };

  //table preset
  const columns = [
    {
      key: "login",
      label: "ЛОГІН",
    },
    {
      key: "name",
      label: "ІМ'Я та ПРІЗВИЩЕ",
    },
    {
      key: "value",
      label: "ОЦІНКА",
    },
  ];

  const rowsObj = React.useMemo(() => {
    const obj = {};
    let iter = 1;
    for (const login in marks) {
      const course = studentsObject[login]?.course;
      const param = {
        key: iter,
        login,
        name: studentsObject[login]?.name,
        value: marks[login],
      };
      obj[course] = obj[course] ? [...obj[course], param] : [param];
      iter++;
    }
    return obj;
  }, [marks, studentsObject]);

  const tables = React.useMemo(() => {
    const ts = [];
    for (const course in rowsObj) {
      const rows = rowsObj[course];
      ts.push(
        <Grid
          key={course}
          sm={12}
          css={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Text>Список {course} курсу</Text>
          <Table
            aria-label="table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column css={{ pl: "30px", pr: "30px" }} key={column.key}>
                  {column.label}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={rows}>
              {(item) => (
                <Table.Row key={item.key}>
                  {(columnKey) => (
                    <Table.Cell css={{ pl: "30px", pr: "30px" }}>
                      {item[columnKey]}
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Grid>
      );
    }
    return ts;
  }, [rowsObj]);

  return (
    <Container css={{ pt: "5vh" }} lg>
      <Row css={{ pb: "30px" }}>
        <Grid.Container>
          <Grid md={2} alignItems="center">
            <Text color="success" css={{ fontSize: "1.2em", fontWeight: 500 }}>
              {teacher?.subject}
            </Text>
          </Grid>
        </Grid.Container>
      </Row>
      <hr />
      <Row css={{ pt: "2vh", pb: "2vh" }}>
        <form style={{ width: "100%" }} onSubmit={handleSubmit} id="add_mark">
          <Grid.Container gap={1}>
            <Grid xs={12} sm={2} alignItems="center">
              <Text css={{ pr: "20px" }}>Курс</Text>
              <Dropdown>
                <Dropdown.Button
                  flat
                  color="success"
                  css={{ tt: "capitalize" }}
                >
                  {course}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="success"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={course}
                  onSelectionChange={setCourse}
                >
                  {coursesList.map((v) => (
                    <Dropdown.Item key={v}>{v}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
            <Grid xs={12} sm={4} alignItems="center">
              <Text css={{ pr: "20px" }}>Студент</Text>
              <Dropdown>
                <Dropdown.Button
                  disabled={course ? false : true}
                  flat
                  color="success"
                  css={{ tt: "capitalize" }}
                >
                  {currentStudent || "Студент"}
                </Dropdown.Button>
                <Dropdown.Menu
                  containerCss={{ width: "320px", maxHeight: "400px" }}
                  aria-label="students"
                  color="success"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={currentStudent}
                  onSelectionChange={setCurrentStudent}
                >
                  {resultStudentArr.map((s) => (
                    <Dropdown.Item css={{ width: "max-content" }} key={s.login}>
                      {s.name + " " + s.surname + ` (${s.login})`}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
            <Grid xs={12} sm={3}>
              <Input
                aria-label="mark"
                width="150px"
                type="number"
                min={0}
                max={100}
                bordered
                disabled={currentStudent ? false : true}
                color="success"
                placeholder="Оцінка"
                onChange={(e) => setMarkValue(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sm={3}>
              <Button
                css={{ width: "min(100%, 150px)" }}
                ghost
                type="submit"
                color="success"
              >
                Додати запис
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </Row>
      <hr />
      <Row css={{ pt: "2vh" }}>
        <Grid.Container gap={2}>{tables}</Grid.Container>
      </Row>
    </Container>
  );
}
