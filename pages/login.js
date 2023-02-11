import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Input,
  Row,
  Text,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Page from "../components/Page";

export default function login() {
  const router = useRouter();
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await signIn("credentials", {
      ...{ login, password },
      redirect: false,
    });

    if (response.error) {
      setAlertMessage(response.error);
      return;
    }

    router.push("/home");
  };

  return (
    <Page title={"Авторизація"}>
      <Container css={{ pt: "6vh" }}>
        <Row justify="center" css={{ pb: "5vh" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Image
              width={60}
              height={60}
              src={
                "https://png.pngtree.com/png-vector/20190802/ourmid/pngtree-magic-wand-icon-png-image_1652859.jpg"
              }
            />
            <Text h1 size={40} color="success" i>
              Лише істиний Слизарень зможе увійти
            </Text>
          </div>
        </Row>
        <Row justify="center">
          <Card css={{ mw: "500px", p: "1vh 2vw 2vh" }}>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Grid.Container gap={1}>
                  <Grid xs={12} justify="center">
                    <Text size={30}>Авторизація</Text>
                  </Grid>
                  <Grid xs={12}>
                    {alertMessage ? (
                      <Text
                        css={{
                          w: "100%",
                          p: "10px",
                          mb: "10px",
                          color: "#44041A",
                          bgColor: "#FDD8E5",
                          borderRadius: "10px",
                        }}
                      >
                        {alertMessage}
                      </Text>
                    ) : null}
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      width="100%"
                      bordered
                      type={"text"}
                      color={"success"}
                      label="Логін"
                      placeholder="Введіть логін..."
                      onChange={(e) => setLogin(e.target.value)}
                      autoComplete="off"
                      required
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      width="100%"
                      bordered
                      // pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                      type={"text"}
                      color={"success"}
                      label="Пароль"
                      placeholder="Введіть пароль..."
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      required
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Button
                      css={{ width: "100%", mt: "20px" }}
                      ghost
                      type="submit"
                      color={"success"}
                    >
                      Увійти
                    </Button>
                  </Grid>
                </Grid.Container>
              </form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Page>
  );
}
