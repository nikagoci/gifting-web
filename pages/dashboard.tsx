import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MinifiedProduct from "@/components/dashboard/minifiedProduct";
import { getSession } from "next-auth/react";
import Image from "next/image";
import User from "@/database/model/userModel";
import { ProductInterface, UserInterface } from "@/utils/interfaces";
import Product from "@/database/model/productModel";
import { useState } from "react";

const candidates = [
  {
    name: "Sada",
    email: "HouseHoldItems",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  {
    name: "Emily Sasdsadelman",
    email: "emilyselman@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
];

interface Props {
  user: UserInterface;
  products: ProductInterface[];
}

export default function DashboardPage({ user, products }: Props) {
  const [allProduct,setAllProduct] = useState<ProductInterface[]>(products)
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
              Email-
              <span className="text-gray-900">{user.email}</span>{" "}
            </p>
            <p className="text-sm font-medium text-gray-500">
              Phone Number-
              <span className="text-gray-900">{user.phoneNumber}</span>{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            Remove Account
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </div>
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Stacked list */}
          <ul
            role="list"
            className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
          >
            {allProduct.map((product) => (
              <MinifiedProduct key={product._id} product={product} setAllProduct={setAllProduct} />
            ))}
          </ul>
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

  if (context.locale) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        products: JSON.parse(JSON.stringify(products)),
        ...(await serverSideTranslations(context.locale, [
          "addproduct",
          "common",
        ])),
      },
    };
  }

  throw new Error("Locale not found");
};
