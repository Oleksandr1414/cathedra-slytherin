import Head from "next/head";
import NavBar from "./NavBar";

export default function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://i.pinimg.com/originals/a0/e2/69/a0e269e725b23d96ff734588ec3069dd.png"
        />
      </Head>
      <main>
        <NavBar />
        {children}
      </main>
    </>
  );
}
