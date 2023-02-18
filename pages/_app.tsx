import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ProductFilterContextProvider } from "../context/ProductFilter";
import { SessionProvider } from "next-auth/react";
import { AddProductContextProvider } from "@/context/AddProduct";
import {StoreProvider} from 'easy-peasy'
import { productStore } from "@/store/ProductStore";

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
      <StoreProvider store={productStore}>
      <AddProductContextProvider>
        <ProductFilterContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProductFilterContextProvider>
      </AddProductContextProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
