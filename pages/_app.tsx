import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ProductContextProvider } from "../context/ProductContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === "/404") {
    return <Component {...pageProps} />;
  }

  return (
    <ProductContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductContextProvider>
  );
}
