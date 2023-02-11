import Link from "next/link";
import { Dropdown, Grid } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";

import styles from "./../../styles/UserProfile.module.css";

export default function UserProfile() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div>
      {session ? (
        <Grid.Container justify="flex-start">
          <Grid>
            <Dropdown placement="bottom-left">
              <Dropdown.Trigger>
                <div className={styles.user_profile}>
                  <div className={styles.user_icon}>
                    {user?.name.slice(0, 1)}
                    {user?.surname.slice(0, 1)}
                  </div>
                  <div className={styles.user_name}>
                    <p>{user?.name}</p>
                    <p>{user?.surname}</p>
                  </div>
                </div>
              </Dropdown.Trigger>
              <Dropdown.Menu containerCss={{ width: "300px" }} color="primary">
                <Dropdown.Item
                  textValue="account"
                  key="account"
                  css={{ height: "$18", width: "280px" }}
                >
                  <Link href="/home">
                    Увійшов як <br />
                    <span className={styles.email_text}>{user?.email}</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  css={{ width: "280px" }}
                  textValue="home"
                  key="home"
                  withDivider
                >
                  <Link href="/home">Мій кабінет</Link>
                </Dropdown.Item>
                <Dropdown.Item
                  css={{ width: "280px" }}
                  textValue="logout"
                  key="logout"
                  withDivider
                >
                  <Link href="/" onClick={() => signOut()}>
                    Вийти
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
        </Grid.Container>
      ) : (
        <Link href="/login">Увійти</Link>
      )}
    </div>
  );
}
