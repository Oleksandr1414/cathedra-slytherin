import {
  Card,
  Container,
  Image,
  Grid,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import axios from "axios";
import React from "react";
import Page from "../components/Page";

export default function learning() {
  const [subjects, setSubjects] = React.useState(null);

  const subjectsCards = React.useMemo(() => {
    if (!subjects) {
      return [];
    }
    const list = [];

    subjects.forEach((subject) => {
      list.push(
        <Grid key={subject.id} xs={12}>
          <Card css={{ w: "100%", pb: "3vh" }}>
            <Card.Body>
              <Text size={40} css={{ textAlign: "center", pb: "3vh" }}>
                {subject?.name}
              </Text>
              <Grid.Container gap={1}>
                <Grid xs={12} sm={4} justify="center" alignItems="center">
                  <Image
                    src={
                      "https://static.thenounproject.com/png/3282617-200.png"
                    }
                    css={{ width: "200px", height: "200px" }}
                  />
                </Grid>
                <Grid xs={12} sm={8}>
                  <Grid.Container gap={1}>
                    <Grid xs={12} alignItems="center">
                      <Card variant="flat" css={{ w: "auto" }}>
                        <Card.Body
                          css={{
                            display: "flex",
                            flexDirection: "row",
                            p: "10px 32px 6px 16px",
                          }}
                        >
                          <Text size="$md">Курс проходження:</Text>
                          <Spacer x={0.5} />
                          <Text weight="bold" size="$md" color="success">
                            {subject?.course}
                          </Text>
                        </Card.Body>
                      </Card>
                    </Grid>
                    <Grid xs={12} alignItems="center">
                      <Card variant="flat" css={{ w: "auto" }}>
                        <Card.Body
                          css={{
                            display: "flex",
                            flexDirection: "row",
                            p: "10px 32px 6px 16px",
                          }}
                        >
                          <Text size="$md">Потрібне обладнання:</Text>
                          <Spacer x={0.5} />
                          <Text weight="bold" size="$md" color="success">
                            {subject?.equipment}
                          </Text>
                        </Card.Body>
                      </Card>
                    </Grid>
                    <Grid xs={12} alignItems="center">
                      <Card variant="flat" css={{ w: "auto" }}>
                        <Card.Body
                          css={{
                            display: "flex",
                            flexDirection: "row",
                            p: "10px 32px 6px 16px",
                          }}
                        >
                          <Text size="$md">Опис:</Text>
                          <Spacer x={0.5} />
                          <Text size="$md" css={{ textAlign: "justify" }}>
                            {subject?.description}
                          </Text>
                        </Card.Body>
                      </Card>
                    </Grid>
                  </Grid.Container>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      );
    });

    return list;
  }, [subjects]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/subjects",
    })
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Page title="Список предметів">
      <Container lg css={{ pt: "5vh", pb: "5vh" }}>
        <Row justify="center">
          <Text size={40}>Список предметів</Text>
        </Row>
        <Row css={{ pt: "3vh" }}>
          <Grid.Container gap={3}>{subjectsCards}</Grid.Container>
        </Row>
      </Container>
    </Page>
  );
}
