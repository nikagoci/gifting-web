import About from "@/components/home-page/about";
import Hero from "@/components/home-page/hero";
import ProductMini from "@/components/home-page/product-mini";
import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import { ProductInterface } from "@/utils/interfaces";
import { GetStaticProps } from "next";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

export default function HomePage({
  products,
}: {
  products: ProductInterface[];
}) {
  return (
    <>
      <Hero />
      <About />
      <ProductMini products={products} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  // let plainProducts;
  let products
  try {
    await connectToDatabase();

    products = await Product.aggregate([{ $sample: { size: 4 } }]);
  } catch (err: any) {
    throw new Error(err);
  }

  if(locale){
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        ...( await serverSideTranslations(locale, ['home', 'common']))
      },
      revalidate: 21600, // 6hours
    };
  }


  throw new Error('Local not found')
    
};
