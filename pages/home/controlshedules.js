import Page from "../../components/Page";
import React from "react";
import axios from "axios";
import getCourse from "../../utils/getCourse";
import { Col, Container, Grid, Row, Table, Text } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function controlshedules() {
  const { data: session } = useSession();
  const [shedules, setShedules] = React.useState(null);

  const columns = [
    {
      key: "subject",
      label: "ПРЕДМЕТ",
    },
    {
      key: "professor",
      label: "ВИКЛАДАЧ",
    },
    {
      key: "date",
      label: "ДАТА",
    },
  ];

  const table = React.useMemo(() => {
    if (!shedules) {
      return [];
    }
    const rows = [];
    for (const subjectName in shedules) {
      const subject = shedules[subjectName];
      const date = () => {
        const d = subject.date.slice(0, 10).split("-");
        return d[2] + "." + d[1] + "." + d[0];
      };

      rows.push({
        key: subjectName,
        subject: subjectName,
        professor: subject.professor,
        date: date(),
      });
    }

    return (
      <Grid
        sm={12}
        css={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
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
  }, [shedules]);

  React.useEffect(() => {
    if (!session || !session?.user) {
      return;
    }

    axios({
      method: "post",
      data: { course: getCourse(session?.user?.date) },
      withCredentials: true,
      url: "http://localhost:3001/getsubjectbycourse",
    })
      .then((res) => {
        const obj = {};
        res.data.forEach((el) => {
          obj[el.name] = {};
        });

        axios({
          method: "get",
          url: "http://localhost:3001/allprofessors",
        })
          .then((res) => {
            const professors = {};
            res.data.forEach((el) => {
              professors[el.subject] = el.name + " " + el.surname;
            });

            axios({
              method: "get",
              url: "http://localhost:3001/getexamsdate",
            })
              .then((res) => {
                const date = {};
                res.data.forEach((el) => {
                  date[el.subject_name] = el.date;
                });

                for (const subject in obj) {
                  obj[subject] = {
                    professor: professors[subject],
                    date: date[subject],
                  };
                }
                setShedules(obj);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [session]);

  return (
    <Page title="Графіе заліків">
      <Container lg css={{ pt: "5vh", pb: "5vh" }}>
        <Row>
          <Col>
            <Text css={{ textAlign: "center", pb: "3vh" }}>
              Графік складання іспитів
              {session?.user?.role === "professor"
                ? " по предметам"
                : " на поточний курс"}
            </Text>
            <Grid.Container>{table}</Grid.Container>
          </Col>
        </Row>
      </Container>
    </Page>
  );
}
