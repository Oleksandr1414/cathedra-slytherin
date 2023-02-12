import Page from "../../components/Page";
import React from "react";
import axios from "axios";
import getCourse from "../../utils/getCourse.js";
import { Col, Container, Grid, Row, Table, Text } from "@nextui-org/react";

export default function marks() {
  const [students, setStudents] = React.useState(null);

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
      key: "avg",
      label: "СЕРЕДНІЙ БАЛ",
    },
  ];

  const tables = React.useMemo(() => {
    const rows = [];
    const returnTables = [];

    const studentsByCourse = {};
    for (const login in students) {
      const s = students[login];
      s.login = login;
      studentsByCourse[s.course] = studentsByCourse[s.course]
        ? [...studentsByCourse[s.course], s]
        : [s];
    }

    if (!Object.keys(studentsByCourse).length) {
      return [];
    }

    for (const course in studentsByCourse) {
      const rows = studentsByCourse[course].sort((a, b) =>
        a.avg < b.avg ? 1 : -1
      );
      returnTables.push(
        <Grid
          key={course}
          sm={12}
          css={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Text css={{ pt: "3vh", textAlign: "center" }}>
            Список {course} курсу
          </Text>
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

    return returnTables;
  }, [students]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/getallmarks",
    })
      .then((res) => {
        const marks = {};
        res.data.forEach((el) => {
          marks[el.student_login] = marks[el.student_login]
            ? [...marks[el.student_login], el.value]
            : [el.value];
        });

        axios({
          method: "get",
          url: "http://localhost:3001/allstudents",
        })
          .then((res) => {
            const obj = {};
            res.data.forEach((el) => {
              obj[el.login] = {
                key: el.login,
                name: el.name + " " + el.surname,
                course: getCourse(el.date),
                avg:
                  (
                    marks[el.login]?.reduce((a, b) => a + b) /
                    marks[el.login]?.length
                  )?.toFixed(2) || 0,
              };
            });
            setStudents(obj);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Page title="Рейтинговий список">
      <Container lg css={{ pt: "5vh", pb: "5vh" }}>
        <Row>
          <Col>
            <Text css={{ textAlign: "center" }}>
              Рейтинговий список чарівників
            </Text>
            <Grid.Container>{tables}</Grid.Container>
          </Col>
        </Row>
      </Container>
    </Page>
  );
}
