import { Grid, Collapse, Text, Container, Row, Image } from "@nextui-org/react";
import Page from "./../components/Page.js";

export default function firstcourse() {
  return (
    <Page title="Вступникам">
      <Container lg css={{ pb: "5vh" }} gap={3}>
        <Row>
          <Image
            width={"min(100%, 600px)"}
            src="https://cdnb.artstation.com/p/assets/images/images/006/742/001/large/a-blanc-castillo-lineart.jpg?1500929683"
          />
        </Row>
        <Row>
          <Grid.Container justify="center">
            <Grid>
              <Collapse.Group shadow>
                <Collapse title="Чистокровним" subtitle="Перелік документів">
                  <ul>
                    <li>
                      <Text i size={22}>
                        &#9755; &nbsp; Свідоцтво про народження дитини
                      </Text>
                    </li>
                    <li>
                      <Text i size={22}>
                        &#9755; &nbsp; Чарівна паличка, що успадкована від
                        предків
                      </Text>
                    </li>
                  </ul>
                </Collapse>
                <Collapse title="Напівкровним" subtitle="Перелік документів">
                  <ul>
                    <li>
                      <Text i size={22}>
                        &#9755; &nbsp; Свідоцтво про народження дитини
                      </Text>
                    </li>
                    <li>
                      <Text i size={22}>
                        &#9755; &nbsp; Паспотри батьків
                      </Text>
                    </li>
                  </ul>
                </Collapse>
              </Collapse.Group>
            </Grid>
          </Grid.Container>
        </Row>
      </Container>
    </Page>
  );
}
