import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ProductContextProvider } from "../context/ProductContext";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  if (router.pathname === "/404") {
    return <Component {...pageProps} />;
  }

  return (
    <SessionProvider session={session}>
      <ProductContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProductContextProvider>
    </SessionProvider>
  );
}
