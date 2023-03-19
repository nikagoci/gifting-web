import { BsPhone } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { UserInterface } from "@/utils/interfaces";
import Image from "next/image";
import Spinner from "../shared/ui/spinner";
import { useTranslation } from "next-i18next";
import capitalizeWord from "@/utils/capitalizeWord";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import toastError from "@/utils/toastErrors";

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
  createdAt: Date;
}

interface InputStateInteface {
  name: string;
  category:
    | "new-arrivals"
    | "household-items"
    | "electronics"
    | "clothes"
    | "other";
  description: string;
}

export default function ModifyProduct({
  product,
  user,
}: {
  product: ProductInterface;
  user: UserInterface;
}) {
  const { t } = useTranslation("addproduct");
  const [inputState, setInputState] = useState<InputStateInteface>({
    name: product.name,
    category: product.category,
    description: product.description,
  });
  const router = useRouter();

  function myLoader() {
    return product.imageSrc;
  }

  const categories = [
    "new-arrivals",
    "household-items",
    "electronics",
    "clothes",
    "other",
  ];

  const username = user.email.split("@")[0];

  const inputChangeHandler = (value: string, input: string) => {
    setInputState((prev) => ({
      ...prev,
      [input]: value,
    }));
  };

  async function updateProduct() {
    try {
      const res = await fetch(`/api/product/${product._id}`, {
        method: "PATCH",
        body: JSON.stringify(inputState),
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();

      if (res.statusText === "OK" && data.message === "Success") {
        router.push(`/products/${product._id}`);
      } else {
        toastError(data.message);
      }
    } catch (err: any) {
      toastError(err);
    }
  }

  return (
    <>
      {!product && <Spinner size={40} />}
      {product && (
        <>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            draggable
            theme="light"
          />
          <div className="bg-white">
            <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                <div className="flex items-center w-full h-full">
                  <Image
                    loader={myLoader}
                    src={product.imageSrc}
                    alt={product.name}
                    className="object-cover object-center"
                    width={600}
                    height={200}
                  />
                </div>

                {/* Product info */}
                <div className="relative flex flex-col justify-center h-full px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                  <div className="space-y-4 font-bold tracking-tight text-gray-900">
                    <label htmlFor="name">{t("modify-product.name")}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={inputState.name}
                      onChange={(e) =>
                        inputChangeHandler(e.target.value, "name")
                      }
                    />
                  </div>
                  <div className="mt-6">
                    <div className="space-y-4 text-lg font-semibold">
                      {t("modify-product.category")}:{" "}
                      <span className="font-bold">
                        {capitalizeWord(inputState.category)}
                      </span>
                      <select
                        id="category"
                        name="category"
                        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={inputState.category}
                        onChange={(e) =>
                          inputChangeHandler(e.target.value, "category")
                        }
                      >
                        {categories.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="space-y-6 text-base text-gray-700" />
                    <div className="space-y-4 font-bold tracking-tight text-gray-900">
                      <label htmlFor="description">
                        {t("modify-product.description")}
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        defaultValue={inputState.description}
                        onChange={(e) =>
                          inputChangeHandler(e.target.value, "description")
                        }
                      />
                    </div>
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
                </div>
              </div>
              <div className="flex items-center justify-center mt-12">
                <button
                  type="submit"
                  className="px-12 py-2 mb-2 text-xl font-bold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={updateProduct}
                >
                  {t("modify-product.save")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
