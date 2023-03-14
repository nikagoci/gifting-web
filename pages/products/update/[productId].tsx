import ModifyProduct from "@/components/update/modify-product";
import Product from "@/database/model/productModel";
import User from "@/database/model/userModel";
import { UserInterface } from "@/utils/interfaces";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface ProductInterface {
  _id: string;
  name: string;
  city: string;
  imageSrc: string;
  description: string;
  category:
    | "new-arrivals"
    | "household-items"
    | "electronics"
    | "clothes"
    | "other";
  gender: "male" | "female";
  createdAt: Date
}


export default function UpdateProduct({
  product,
  user,
}: {
  product: ProductInterface;
  user: UserInterface;
}) {
    return <ModifyProduct product={product} user={user} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  let product;
  let user;

  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

  try {
    product = await Product.findById(context?.params?.productId);

    user = await User.findById(product.creator);
  } catch (err: any) {
    return {
      notFound: true,
    };
  }

  if (session.user?.email !== user.email) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

  if (context.locale) {
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        user: JSON.parse(JSON.stringify(user)),
        ...(await serverSideTranslations(context.locale, [
          "addproduct",
          "common",
        ])),
      },
    };
  }

  throw new Error("Locale not found");
};
