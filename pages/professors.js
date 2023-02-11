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

export default function Professors() {
  const [professors, setProfessors] = React.useState(null);

  const professorsCards = React.useMemo(() => {
    if (!professors) {
      return [];
    }
    const list = [];

    professors.forEach((professor) => {
      list.push(
        <Grid key={professor.id} xs={12} md={6}>
          <Card css={{ w: "100%", pb: "3vh" }}>
            <Card.Body>
              <Grid.Container>
                <Grid xs={12} justify="center">
                  <Text size={40}>{professor?.name}</Text>
                  <Spacer x={0.5} />
                  <Text size={40}>{professor?.surname}</Text>
                </Grid>
              </Grid.Container>
              <Grid.Container gap={1}>
                <Grid xs={12} sm={4} justify="center" alignItems="center">
                  <Image
                    src={
                      "https://cdn-icons-png.flaticon.com/512/1669/1669386.png"
                    }
                    css={{ width: "200px", height: "200px" }}
                  />
                </Grid>
                <Grid xs={12} sm={8}>
                  <Grid.Container
                    gap={1}
                    alignContent="flex-start"
                    css={{ pt: "25px" }}
                  >
                    <Grid xs={12} alignItems="center">
                      <Card variant="flat" css={{ w: "auto" }}>
                        <Card.Body
                          css={{
                            display: "flex",
                            flexDirection: "row",
                            p: "10px 32px 6px 16px",
                          }}
                        >
                          <Text size="$md">Предмет викладання:</Text>
                          <Spacer x={0.5} />
                          <Text weight="bold" size="$md" color="success">
                            {professor?.subject}
                          </Text>
                        </Card.Body>
                      </Card>
                    </Grid>
                    {professor?.position && (
                      <Grid xs={12} alignItems="center">
                        <Card variant="flat" css={{ w: "auto" }}>
                          <Card.Body
                            css={{
                              display: "flex",
                              flexDirection: "row",
                              p: "10px 32px 6px 16px",
                            }}
                          >
                            <Text size="$md">Категорія:</Text>
                            <Spacer x={0.5} />
                            <Text weight="medium" size="$md" color="success">
                              {professor?.position}
                            </Text>
                          </Card.Body>
                        </Card>
                      </Grid>
                    )}
                    {professor?.description && (
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
                              {professor?.description}
                            </Text>
                          </Card.Body>
                        </Card>
                      </Grid>
                    )}
                  </Grid.Container>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      );
    });

    return list;
  }, [professors]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/allprofessors",
    })
      .then((res) => {
        setProfessors(res.data);
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
          <Grid.Container gap={3}>{professorsCards}</Grid.Container>
        </Row>
      </Container>
    </Page>
  );
}
