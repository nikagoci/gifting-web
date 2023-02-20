import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ProductFilterContextProvider } from "../context/ProductFilter";
import { SessionProvider } from "next-auth/react";
import {StoreProvider} from 'easy-peasy'
import { productStore } from "@/store/ProductStore";
import { appWithTranslation } from 'next-i18next'

function App({
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
        <ProductFilterContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProductFilterContextProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(App)

// export const getStaticProps: GetStaticProps= async ({locale}) => {
//   if(locale){
//     return {
//       props: {
//         ...( await serverSideTranslations(locale, ['home']))
//       }
//     };
//   }

//   throw new Error('Local Not Found!')
// };
