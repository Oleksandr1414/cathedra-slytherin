import { Card, Container, Row, Text } from "@nextui-org/react";
import Page from "../components/Page";

export default function PageNotFound() {
  return (
    <Page title="Помилка">
      <Container lg css={{ pt: "8vh" }}>
        <Row justify="center">
          <Card
            variant={"shadow"}
            css={{ w: "auto", p: "10px 70px", bgColor: "#FDD8E5" }}
          >
            <Card.Body
              css={{
                display: "flex",
                gap: "20px",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text size={"$3xl"}>404</Text>
              <Text>Сторінку не знайдено</Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Page>
  );
}
