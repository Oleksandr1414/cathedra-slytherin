import Link from "next/link";
import React, { useMemo } from "react";
import UserProfile from "./UserProfile/UserProfile";
import { Button, Image, Navbar, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { pathname: url } = useRouter();
  const { data: session } = useSession();
  const variant = "underline";
  const activeColor = "success";

  const createUserLink = useMemo(() => {
    if (!session?.user) {
      return;
    }

    if (session.user.role === "admin" || session.user.role === "professor") {
      return (
        <Link href="/home/createaccount">
          Додати
          {session.user.role === "admin" ? " користувача" : " учня"}
        </Link>
      );
    }

    return null;
  }, [session]);

  const userProfileBlock = useMemo(() => {
    if (session) {
      return <UserProfile />;
    } else {
      return (
        <Button flat color="success" auto>
          <Link color="inherit" href="/login">
            Увійти
          </Link>
        </Button>
      );
    }
  }, [session]);

  const links = React.useMemo(
    () =>
      url.includes("/home") ? (
        <>
          <Link href="/">На головну</Link>
          <Link href="/home/marks">Оцінки</Link>
          <Link href="/home/controlshedules">Графік контролю</Link>
          <Link href="/home/rating">Рейтинговий список</Link>
          {createUserLink}
        </>
      ) : (
        <>
          <Link href="/">Новини</Link>
          <Link href="/vstyp">Вступникам</Link>
          <Link href="/learning">Перелік предметів</Link>
          <Link href="/professors">Викладачі</Link>
          <Link href="/contacts">Контакти</Link>
        </>
      ),
    [url]
  );

  return (
    <Navbar
      height={80}
      variant="sticky"
      maxWidth={"fluid"}
      css={{ zIndex: 11111 }}
    >
      <Navbar.Toggle showIn="md" />
      <Navbar.Brand>
        <Image
          width={60}
          height={60}
          src="https://i.pinimg.com/originals/a0/e2/69/a0e269e725b23d96ff734588ec3069dd.png"
        />
        <Text showIn="md" size="$2xl">
          Slytherin
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor={activeColor}
        hideIn="md"
        variant={variant}
      >
        {links}
      </Navbar.Content>
      <Navbar.Content>
        <div>{userProfileBlock}</div>
      </Navbar.Content>
      <Navbar.Collapse>
        <Navbar.CollapseItem
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {links}
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
}
