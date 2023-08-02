import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "easy-peasy";
import { productStore } from "@/store/ProductStore";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  if (router.pathname === "/404") {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <title>Charma</title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/logo.png"
        />
        <meta
          name="description"
          content="Charity website which helps people with different products."
        />
        <meta name="keywords" content="Charity, Free, Products" />
      </Head>
      <SessionProvider session={session}>
        <StoreProvider store={productStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(App);