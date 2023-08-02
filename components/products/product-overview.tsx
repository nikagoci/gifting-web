import { NextRouter, useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { BsPhone } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { BsTrash } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";

import { ProductInterface, UserInterface } from "@/utils/interfaces";
import Spinner from "../shared/ui/spinner";
import capitalizeWord from "@/utils/capitalizeWord";

const removeProductFromDB = async (id: string, router: NextRouter) => {
  const res = await fetch(`/api/product/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    router.push("/dashboard");
  }
};

export default function ProductOverview({
  product,
  isAuthor,
  user,
}: {
  product: ProductInterface;
  isAuthor: boolean;
  user: UserInterface;
}) {
  const router = useRouter();
  const { t } = useTranslation("addproduct");

  const username = user.email.split("@")[0];

  const handleRemoveProduct = () => {
    removeProductFromDB(product._id, router);
  };

  return (
    <>
      {!product && <Spinner size={40} />}
      {product && (
        <div className="bg-white">
          <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              <div className="flex items-center w-full h-full">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  className="object-cover object-center w-[550px] h-[450px]"
                  width={550}
                  height={450}
                  priority
                />
              </div>

              {/* Product info */}
              <div className="relative flex flex-col justify-center h-full px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  {product.name}
                </h1>
                <div className="mt-6">
                  <h3 className="font-serif text-lg">
                    {t("add-product.category")}:{" "}
                    <span className="font-bold">
                      {capitalizeWord(product.category)}
                    </span>
                  </h3>
                </div>
                <div className="mt-6">
                  <div className="space-y-6 text-base text-gray-700" />
                  <p>{product.description}</p>
                </div>

                <section aria-labelledby="details-heading" className="mt-12 ">
                  <h2 id="details-heading" className="mb-8 text-xl font-bold">
                    {t("product-overview.author")}
                  </h2>
                  <div className="flex flex-col">
                    <div className="px-16 py-6 font-semibold border border-emerald-300 bg-emerald-50 rounded-xl">
                      <div className="flex items-center mb-6 text-xl gap-x-3">
                        <AiOutlineUser className="w-8 h-auto text-emerald-500" />
                        <h6>{username}</h6>
                      </div>
                      <div className="flex items-center mb-6 text-xl gap-x-3">
                        <BsPhone className="w-8 h-auto text-emerald-500" />
                        <h6>{user.phoneNumber}</h6>
                      </div>
                      <div className="flex items-center mb-6 text-xl gap-x-3">
                        <LocationMarkerIcon className="w-8 h-auto text-emerald-500" />
                        <h6>{capitalizeWord(product.city)}</h6>
                      </div>
                    </div>
                  </div>
                </section>
                {isAuthor && (
                  <div className="absolute top-0 right-0 flex gap-x-2">
                    <Link
                      href={`/products/update/${product._id}`}
                      className="p-2 bg-gray-100 rounded cursor-pointer"
                    >
                      <GrUpdate size={20} />
                    </Link>
                    <div
                      className="p-2 bg-gray-100 rounded cursor-pointer"
                      onClick={handleRemoveProduct}
                    >
                      <BsTrash size={20} color="red" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
