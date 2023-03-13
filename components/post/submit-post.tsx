import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CheckboxList from "./checkbox-list";
import { ToastContainer } from "react-toastify";
import toastError from "@/utils/toastErrors";
import { CheckIcon } from "@heroicons/react/outline";

import "react-toastify/dist/ReactToastify.css";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { Products } from "@/store/ProductStore";
import { useRouter } from "next/router";
import Spinner from "../shared/ui/spinner";
import Modal, { themeEnum } from "../shared/modal";
import { useTranslation } from "next-i18next";

const createProduct = async (
  productState: Products,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  setIsLoading(true);
  const response = await fetch("/api/product", {
    method: "POST",
    body: JSON.stringify({
      ...productState,
      imageSrc: productState.image,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  setIsLoading(false);

  return data;
};

const clearSessionStorage = () => {
  sessionStorage.clear();
};

export default function SubmitPost() {
  const productStore = useStoreState((state) => state.products);
  const clearProducts = useStoreActions((state) => state.clearProducts);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const router = useRouter();
  const { t } = useTranslation("addproduct");

  useEffect(() => {
    if (
      !productStore.description ||
      !productStore.gender ||
      !productStore.image ||
      !productStore.name
    ) {
      router.push("/post/add-product");
    }
  }, []);

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!checked) {
      toastError(
        "You can not submit post without accept usage of phone number"
      );
    } else {
      const response = await createProduct(productStore, setIsLoading);

      if (response.status === "success") {
        clearSessionStorage();
        clearProducts();
        setProductId(response.product._id);
      } else {
        toastError("Something went wrong. try again later");
      }
    }
  }

  if (isLoading) {
    return (
      <div className="mt-20">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          draggable
          theme="light"
        />
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <>
      {productId && (
        <Modal
          id={productId}
          header="Product successfully added"
          description="Do you want to see your product or go back to home page?"
          option1='See Product'
          option2='Go back to home'
          icon={<CheckIcon className="w-6 h-6 text-green-600" aria-hidden="true" />}
          theme={themeEnum.green}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        theme="light"
      />
      <div>
        <h3 className="text-2xl font-bold text-center">
          {t("submit-product.header")}
        </h3>
        <div className="flex flex-col items-center py-16">
          <h3 className="text-lg">
            {t("submit-product.warning")}{" "}
            <span className="font-bold underline">
              {t("submit-product.carefully")}!
            </span>
          </h3>
          <form onSubmit={submitHandler} className="flex flex-col items-center">
            <div className="py-12">
              <CheckboxList checked={checked} setChecked={setChecked} />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-16 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("submit-product.button")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
