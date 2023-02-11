import { Container, Row } from "@nextui-org/react";
import Page from "../components/Page";

export default function contacts() {
  return (
    <Page title={"Контакти"}>
      <div
        style={{
          w: "100%",
          height: "calc(100vh - 80px)",
          backgroundBlendMode: "darken",
          backgroundColor: "#00000094",
          background:
            "url(https://abrakadabra.fun/uploads/posts/2022-03/1647652375_1-abrakadabra-fun-p-oboi-garri-potter-na-telefon-slizerin-2.jpg)",
          backgroundSize: "cover",
          backgroundPositionY: "center",
          backgroundPositionX: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container lg>
          <Row>123</Row>
        </Container>
      </div>
    </Page>
  );
}
