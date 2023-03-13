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

interface Props {
  user: UserInterface;
  products: ProductInterface[];
}

export default function DashboardPage({ user, products }: Props) {
  const [allProduct, setAllProduct] = useState<ProductInterface[]>(products);
  const { t } = useTranslation("dashboard");
  const userName = user.email.split("@")[0];

  return (
    <div className="relative min-h-screen bg-white">
      <div className="max-w-3xl px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center py-8 space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                className="rounded-full"
                src="/user.png"
                alt="user"
                width={42}
                height={42}
              />
              <span
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
            <p className="text-sm font-medium text-gray-500">
              {t("email")}-<span className="text-gray-900">{user.email}</span>{" "}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {t("phone")}-
              <span className="text-gray-900">{user.phoneNumber}</span>{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            {t("remove")}
          </button>
          <Link
            href="/post/add-product"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            {t("add")}
          </Link>
        </div>
      </div>
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Stacked list */}
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
