import ProductFilter from "@/components/products/product-filter";
import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import { ProductInterface } from "@/utils/interfaces";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ProductsPage({
  products,
}: {
  products: ProductInterface[];
}) {
  return <ProductFilter products={products} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let products;
  try {
    if (context.query.page) {
      await connectToDatabase();
      const page = +context.query.page;
      const limit = 8;
      const skip = (page - 1) * limit;

      products = await Product.find().skip(skip).limit(limit);
    }
  } catch (err: any) {
    throw new Error(err);
  }

  if(context.locale) {
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        ...( await serverSideTranslations(context.locale, ['products', 'common']))
      },
    };
  }

  throw new Error('Context local not found')

  
};