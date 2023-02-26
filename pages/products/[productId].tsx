import ProductOverview from "@/components/products/product-overview";
import Product from "@/database/model/productModel";
import User from "@/database/model/userModel";
import { ProductInterface, UserInterface } from "@/utils/interfaces";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SingleProductPage({
  product,
  isAuthor,
  user
}: {
  product: ProductInterface;
  isAuthor: boolean;
  user: UserInterface
}) {

     return <ProductOverview product={product} isAuthor={isAuthor} user={user} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  let product;
  let user;
  let isAuthor = false;

  try {
    product = await Product.findById(context?.params?.productId);

    user = await User.findById(product.creator)
  } catch (err: any) {
    return {
        notFound: true
    }
  }

  if(session && session.user?.email === user.email) {
    isAuthor = true
  }

  if(context.locale){
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        user: JSON.parse(JSON.stringify(user)),
        isAuthor,
        ...( await serverSideTranslations(context.locale, ['addproduct', 'common']))
      },
    };
  }

  throw new Error("Locale not found")


};
