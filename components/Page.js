import Head from "next/head";
import NavBar from "./NavBar";

export default function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <NavBar />
        {children}
      </main>
    </>
  );
}
