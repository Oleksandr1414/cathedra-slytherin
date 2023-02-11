import { Card, Container, Grid, Row, Text } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Page from "../../components/Page";
import getDateFormat from "../../utils/getDateFormat.js";

export default function post() {
  const url = useRouter();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    if (!url.query.id) {
      return;
    }

    axios({
      method: "post",
      data: { post_id: url.query.id },
      withCredentials: true,
      url: "http://localhost:3001/getpost",
    })
      .then((res) => {
        if (!res.data || !res.data?.length) {
          url.push("/");
        }
        setPost(res.data[0]);
      })
      .then((err) => console.log(err));
  }, [url]);

  const postCard = React.useMemo(() => {
    if (!post) {
      return [];
    }

    return (
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
                {post?.title}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Text size={20} css={{ color: "$accents8" }}>
                {getDateFormat(post?.date)}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Body css={{ py: "$2" }}>
          <Text css={{ textAlign: "justify", lineHeight: "150%" }} size={25}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post?.content}
          </Text>
        </Card.Body>
      </Card>
    );
  }, [post]);

  return (
    <Page title={`Пост ${1}`}>
      <Container sm css={{ pt: "5vh", pb: "5vh" }}>
        <Row>
          <Link href={"/"}>&#10162; На головну</Link>
        </Row>
        <Row css={{ pt: "2vh" }}>{postCard}</Row>
      </Container>
    </Page>
  );
}
