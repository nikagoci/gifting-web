import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MinifiedProduct from "@/components/dashboard/minifiedProduct";
import { getSession } from "next-auth/react";
import Image from "next/image";
import User from "@/database/model/userModel";
import { ProductInterface, UserInterface } from "@/utils/interfaces";
import Product from "@/database/model/productModel";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import MultipleDelete from "@/components/dashboard/multiple-delete";
import UserProfile from "@/components/dashboard/user-profile";

interface Props {
  user: UserInterface;
  products: ProductInterface[];
}

export default function DashboardPage({ user, products }: Props) {
  const [allProduct, setAllProduct] = useState<ProductInterface[]>(products);
  const { t } = useTranslation("dashboard");
  
  return (
    <div className="relative min-h-screen bg-white">
      <UserProfile user={user} />
      {/* <MultipleDelete allProduct={allProduct} /> */}
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="flex justify-center">
              <h1 className="text-xl font-bold text-rose-600">
                {t("no-product")}
              </h1>
            </div>
          ) : (
            <ul
              role="list"
              className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
            >
              {allProduct.map((product) => (
                <MinifiedProduct
                  key={product._id}
                  product={product}
                  setAllProduct={setAllProduct}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

  let user;
  let products;
  try {
    user = await User.findOne({ email: session.user?.email });
    const productIds = JSON.parse(JSON.stringify(user.products));

    products = await Product.find({
      _id: { $in: productIds },
    }).lean();
  } catch (err: any) {}

  if (!user) {
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
        user: JSON.parse(JSON.stringify(user)),
        products: JSON.parse(JSON.stringify(products)),
        ...(await serverSideTranslations(context.locale, [
          "dashboard",
          "common",
        ])),
      },
    };
  }

  throw new Error("Locale not found");
};
