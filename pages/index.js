import { Card, Container, Grid, Row, Spacer, Text } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import React from "react";
import Page from "../components/Page";
import getDateFormat from "../utils/getDateFormat.js";

import styles from "./../styles/Posts.module.css";

export default function Posts() {
  const [newsCards, setNewsCards] = React.useState(null);

  const newsCardsList = React.useMemo(() => {
    const list = [];
    if (!newsCards) {
      return list;
    }

    newsCards.forEach((card) => {
      list.push(
        <Grid xs={12} sm={6} md={4} key={card.id}>
          <Card css={{ p: "$6", w: "100%" }}>
            <Card.Header>
              <img
                alt="newspaper"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUfuhZdiiKL32jENVf0TvbBVh8Z_DE-sBYJnxVpFwAH2Uz1tKaij1MklbqWR_Y587Z6B0&usqp=CAU"
                width="44px"
                height="44px"
              />
              <Grid.Container css={{ pl: "$6" }}>
                <Grid xs={12}>
                  <Text size={28} h4 css={{ lineHeight: "$xs" }}>
                    {card.title}
                  </Text>
                </Grid>
                <Grid xs={12}>
                  <Text size={20} css={{ color: "$accents8" }}>
                    {getDateFormat(card.date)}
                  </Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: "$2" }}>
              <Text size={25}>{card.content}</Text>
            </Card.Body>
            <Card.Footer>
              <Link style={{ color: "#0B7439" }} href={`/posts/${card.id}`}>
                Читати більше..
              </Link>
            </Card.Footer>
          </Card>
        </Grid>
      );
    });

    return list;
  }, [newsCards]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/getposts",
    })
      .then((res) => {
        setNewsCards(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Page title={"Головна"}>
      <div className={styles.main_container}>
        <p>FACULTY OF</p>
        <h1 className={styles.main_container_text}>SLYTHERIN</h1>
      </div>
      {newsCardsList.length && (
        <Container lg>
          <Row css={{ pt: "7vh", pb: "7vh" }}>
            <Grid.Container lg gap={2}>
              <Grid xs={12} justify="center" alignItems="flex-end">
                <Text size={40}>Онлайн газета факультету</Text>
                <Spacer x={0.8} />
                <img
                  alt="peno"
                  src="https://cdn-icons-png.flaticon.com/512/4363/4363382.png"
                  width="50px"
                  height="50px"
                />
              </Grid>
              {newsCardsList}
            </Grid.Container>
          </Row>
        </Container>
      )}
    </Page>
  );
}
