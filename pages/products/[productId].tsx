import ProductOverview from "@/components/products/product-overview";
import Product from "@/database/model/productModel";
import { ProductInterface } from "@/utils/interfaces";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SingleProductPage({
  product,
}: {
  product: ProductInterface;
}) {
     return <ProductOverview product={product} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let product;
  try {
    product = await Product.findById(context?.params?.productId);
  } catch (err: any) {
    return {
        notFound: true
    }
  }

  if(context.locale){
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        ...( await serverSideTranslations(context.locale, ['addproduct', 'common']))
      },
    };
  }

  throw new Error("Locale not found")


};
