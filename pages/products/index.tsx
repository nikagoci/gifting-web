import ProductFilter from "@/components/products/product-filter";
import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import { ProductInterface } from "@/utils/interfaces";
import { GetStaticProps } from "next";

export default function ProductsPage({
  products,
}: {
  products: ProductInterface[];
}) {
  return <ProductFilter products={products} />;
}

export const getStaticProps: GetStaticProps = async () => {
  let products;
  try {
    await connectToDatabase();

    products = await Product.find();
  } catch (err: any) {
    throw new Error(err);
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
