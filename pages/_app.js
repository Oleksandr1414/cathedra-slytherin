import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "@react-aria/ssr";
import "./../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </SSRProvider>
  );
}
