import About from "@/components/home-page/about";
import Hero from "@/components/home-page/hero";
import ProductMini from "@/components/home-page/product-mini";
import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import { ProductInterface } from "@/utils/interfaces";
import { GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = async (context) => {
  // let plainProducts;
  let products
  try {
    await connectToDatabase();


    products = await Product.aggregate([{ $sample: { size: 4 } }]);

    // plainProducts = products.map((product) => {
    //   const plainProduct = {
    //     ...product,
    //     _id: product._id.toString(),
    //     createdAt: product.createdAt.toString(),
    //   };

    //   return plainProduct;
    // });


  } catch (err: any) {
    throw new Error(err);
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
    revalidate: 21600, // 6hours
  };
};
