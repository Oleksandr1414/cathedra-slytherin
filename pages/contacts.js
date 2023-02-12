import { Container, Grid, Image, Row, Text } from "@nextui-org/react";
import Page from "../components/Page";

export default function contacts() {
  return (
    <Page title={"Контакти"}>
      <div className="contacts_block">
        <Container sm css={{ height: "100%" }}>
          <Grid.Container css={{ height: "100%" }}>
            <Grid xs={12} alignItems="center" justify="right">
              <Image
                width={200}
                height={200}
                src="https://icon-library.com/images/address-icon-white/address-icon-white-7.jpg"
              />
              <Text weight={"bold"} size={55} color={"#fff"}>
                The College, Durham, DH1 3EH
              </Text>
            </Grid>
          </Grid.Container>
        </Container>
      </div>
    </Page>
  );
}
