import Page from "../../components/Page";
import axios from "axios";
import getCourse from "../../utils/getCourse.js";
import React from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Container,
  Grid,
  Input,
  Modal,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function account() {
  const { data: session } = useSession();
  const [newPassword, setNewPassword] = React.useState(null);

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const userData = React.useMemo(() => {
    if (!session?.user) {
      return "";
    }

    return session.user;
  }, [session]);

  const updatePassword = async () => {
    if (!newPassword) {
      alert("Введіть новий пароль");
      return;
    }

    const response = await axios({
      method: "post",
      data: { login: session?.user?.login, pass: newPassword },
      withCredentials: true,
      url: "http://localhost:3001/changepassword",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    if (response?.data?.error?.message) {
      alert(response?.data?.error.message);
      return;
    } else {
      alert("Пароль оновлено успішно");
      closeHandler();
    }
  };

  return (
    <Page title={"Профіль"}>
      <Container lg css={{ pt: "5vh", pb: "3vh" }}>
        <Row>
          <Col>
            <Card css={{ w: "auto", pb: "3vh" }}>
              <Card.Body>
                <Text size={40} css={{ textAlign: "center", pb: "3vh" }}>
                  Профіль
                </Text>
                <Grid.Container gap={1}>
                  <Grid xs={12} sm={4} justify="center" alignItems="center">
                    <Avatar
                      bordered
                      color="success"
                      src={
                        "https://cdn-icons-png.flaticon.com/512/86/86485.png"
                      }
                      css={{ width: "300px", height: "300px" }}
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
                            <Text>{userData.name}</Text>
                            <Spacer x={0.5} />
                            <Text>{userData.surname}</Text>
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
                            <Text size="$md">Email: </Text>
                            <Spacer x={0.5} />
                            <Text weight="bold" size="$md" color="success">
                              {userData.email}
                            </Text>
                          </Card.Body>
                        </Card>
                      </Grid>
                      <Grid xs={12} alignItems="flex-start">
                        <Card variant="flat" css={{ w: "auto" }}>
                          <Card.Body
                            css={{
                              display: "flex",
                              flexDirection: "row",
                              p: "10px 32px 6px 16px",
                            }}
                          >
                            <Text size="$md">Курс:</Text>
                            <Spacer x={0.5} />
                            <Text weight="bold" size="$md" color="success">
                              {getCourse(userData.date) || 7}
                            </Text>
                          </Card.Body>
                        </Card>
                      </Grid>
                      <Grid xs={12} alignItems="center">
                        <Button ghost onPress={handler} color={"success"}>
                          Змінити пароль
                        </Button>
                        <Modal
                          closeButton
                          blur
                          aria-label="modal"
                          open={visible}
                          onClose={closeHandler}
                        >
                          <Modal.Header></Modal.Header>
                          <Modal.Body>
                            <Input
                              bordered
                              fullWidth
                              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                              color="success"
                              size="lg"
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Новий пароль..."
                            />
                          </Modal.Body>
                          <Modal.Footer justify="center">
                            <Button
                              color="success"
                              auto
                              flat
                              onClick={updatePassword}
                            >
                              Змінити
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Grid>
                    </Grid.Container>
                  </Grid>
                </Grid.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Page>
  );
}
