import React from "react";
import axios from "axios";
import { Col, Container, Row, Table, Text } from "@nextui-org/react";

export default function StudentMarksPage({ user }) {
  const [subjects, setSubjects] = React.useState(null);
  const [data, setData] = React.useState(null);

  const columns = [
    {
      key: "course",
      label: "КУРС",
    },
    {
      key: "subject",
      label: "ПРЕДМЕТ",
    },
    {
      key: "mark",
      label: "ОЦІНКА",
    },
  ];
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    axios({
      method: "post",
      data: { login: user.login },
      withCredentials: true,
      url: "http://localhost:3001/getstudentmarks",
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));

    axios({
      method: "get",
      url: "http://localhost:3001/subjects",
    })
      .then((res) => {
        const obj = {};
        res.data.forEach((el) => (obj[el.name] = el.course));

        setSubjects(obj);
      })
      .catch((err) => console.log(err));
  }, [user]);

  React.useEffect(() => {
    if (!data || !subjects) {
      return;
    }

    const arr = [];
    data.forEach((el) => {
      arr.push({
        key: el.id,
        course: subjects[el.subject_name],
        subject: el.subject_name,
        mark: el.value,
      });
    });

    setRows(arr.sort((a, b) => (a.course > b.course ? 1 : -1)));
  }, [data, subjects]);

  return (
    <Container css={{ pt: "5vh", pb: "5vh" }} lg>
      <Row css>
        <Col>
          <Text css={{ pb: "2vh", textAlign: "center" }}>
            Оцінки по предметам
          </Text>
          <Table
            aria-label="table"
            css={{
              height: "auto",
              width: "100%",
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={rows}>
              {(item) => (
                <Table.Row key={item.key}>
                  {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
