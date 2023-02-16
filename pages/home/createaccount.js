import Page from "../../components/Page";
import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Input,
  Image,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/router";

export default function CreateAccount() {
  const { data: session } = useSession();
  const router = useRouter();

  const inputColor = "success";
  const [role, setRole] = React.useState("student");
  const [login, setLogin] = React.useState(null);
  const [password, setPassword] = React.useState(1);
  const [name, setName] = React.useState(null);
  const [surname, setSurname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [subject, setSubject] = React.useState(null);
  const [subjects, setSubjects] = React.useState(null);
  const [description, setDescription] = React.useState(null);

  React.useEffect(() => {
    if (session && session?.user?.role === "student") {
      router.push("/home");
      return;
    }
  }, [session]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/subjects",
    }).then((res) => {
      const data = res.data;
      const subjectsArr = data.map((ell) => ell.name);
      setSubjects(subjectsArr);
    });
  }, []);

  const userParams = {
    login,
    password: role.currentKey === "professor" ? password : 1,
    name,
    surname,
    email,
    role: role?.currentKey || "student",
    date: null,
    subject: subject?.currentKey,
    description,
  };

  const userEmail = React.useMemo(() => {
    if (role.currentKey === "professor") {
      return;
    }
    const uemail = `${name?.trim()?.slice(0, 1) || "em"}${
      surname?.trim() || "ai"
    }${login?.slice(-3) || "l"}@slytherin.com`;
    setEmail(uemail);
  }, [name, surname, login]);

  const renderErrorMessage = (message) => {
    alert(message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(userParams);
    if (!userParams.subject) {
      alert("Select subject");
      return;
    }

    if (!userParams.description) {
      alert("Write discription");
      return;
    }

    let response = null;
    try {
      if (userParams.role === "professor") {
        response = await axios({
          method: "post",
          data: userParams,
          withCredentials: true,
          url: "http://localhost:3001/createprofessor",
        });
      } else {
        response = await axios({
          method: "post",
          data: userParams,
          withCredentials: true,
          url: "http://localhost:3001/createstudent",
        });
      }
    } catch (err) {
      renderErrorMessage(err.message);
      return;
    }

    if (response?.data?.error?.message) {
      renderErrorMessage(response?.data?.error.message);
      return;
    } else {
      setName(null);
      setSurname(null);
      setLogin(null);
      setSubject(null);
      alert("Acount create success");
      document.getElementById("create_accoutn_form").reset();
    }
  };

  return (
    <Page title={"Додати користувача"}>
      <Container lg>
        <Grid.Container css={{ h: "80vh", p: "2vh 0" }}>
          <Grid xs={0} sm={5} justify="center" alignItems="center">
            <Image
              width={300}
              src="https://www.nicepng.com/png/full/226-2269213_slytherin-printed-wall-banner-harry-potter-slytherin-flag.png"
              alt="Slytherin Flag"
            />
          </Grid>
          <Grid xs={12} sm={7} justify="left" alignItems="center">
            <form onSubmit={handleSubmit} id="create_accoutn_form">
              <Grid.Container gap={1}>
                <Grid xs={12} sm={12}>
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      color={inputColor}
                      css={{ tt: "capitalize" }}
                    >
                      {role}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      color={inputColor}
                      disallowEmptySelection
                      selectionMode="single"
                      onSelectionChange={setRole}
                    >
                      <Dropdown.Item key="student">Студент</Dropdown.Item>
                      {session?.user.role === "admin" && (
                        <Dropdown.Item key="professor">Викладач</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid>{" "}
                <Grid xs={12} sm={6}>
                  <Input
                    width="100%"
                    bordered
                    clearable
                    type="text"
                    color={inputColor}
                    label="Логін"
                    placeholder="Введіть логін..."
                    onChange={(e) => setLogin(e.target.value.trim())}
                    autoComplete="off"
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Input
                    width="100%"
                    bordered
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    disabled={role.currentKey === "professor" ? false : true}
                    type={"text"}
                    initialValue={role.currentKey === "professor" ? "" : 1}
                    color={inputColor}
                    label="Пароль"
                    placeholder="Введіть пароль..."
                    onChange={(e) => setPassword(e.target.value.trim())}
                    autoComplete="off"
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Input
                    width="100%"
                    bordered
                    clearable
                    type="text"
                    color={inputColor}
                    label="Ім'я"
                    placeholder="Введіть ім'я..."
                    onChange={(e) => setName(e.target.value.trim())}
                    autoComplete="off"
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Input
                    width="100%"
                    bordered
                    clearable
                    type="text"
                    color={inputColor}
                    label="Прізвище"
                    placeholder="Введіть прізвище..."
                    onChange={(e) => setSurname(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </Grid>
                <Grid xs={12} sm={8}>
                  <Input
                    width="100%"
                    bordered
                    color={inputColor}
                    disabled={role.currentKey === "professor" ? false : true}
                    type="text"
                    value={role.currentKey === "professor" ? null : email}
                    placeholder="Введіть email..."
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} alignItems="flex-end">
                  {role.currentKey !== "professor" ? (
                    <Input
                      width="100%"
                      bordered
                      type="date"
                      min={`${new Date().getFullYear() - 17}-08-30`}
                      max={`${new Date().getFullYear() - 11}-08-30`}
                      color={inputColor}
                      label="Дата народження"
                      onChange={(e) => (userParams["date"] = e.target.value)}
                      autoComplete="off"
                      required
                    />
                  ) : (
                    <Dropdown>
                      <Dropdown.Button
                        flat
                        color={inputColor}
                        css={{ tt: "capitalize", w: "100%" }}
                      >
                        {subject || "Предмет"}
                      </Dropdown.Button>
                      <Dropdown.Menu
                        color={inputColor}
                        disallowEmptySelection
                        selectionMode="single"
                        onSelectionChange={setSubject}
                      >
                        {subjects.map((s) => (
                          <Dropdown.Item key={s}>{s}</Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </Grid>
                <Grid xs={12} sm={12}>
                  {role.currentKey === "professor" ? (
                    <Textarea
                      width="100%"
                      bordered
                      color={inputColor}
                      label="Коментар"
                      placeholder="Опис викладача..."
                      autoComplete="off"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  ) : null}
                </Grid>
                <Grid xs={12} sm={6}>
                  <Button
                    css={{ width: "100%", mt: "10px" }}
                    ghost
                    type="submit"
                    color={inputColor}
                  >
                    Створити запис
                  </Button>
                </Grid>
              </Grid.Container>
            </form>
          </Grid>
        </Grid.Container>
      </Container>
    </Page>
  );
}
