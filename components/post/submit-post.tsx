import { FormEvent, useState } from "react";
import CheckboxList from "./checkbox-list";
import { ToastContainer } from "react-toastify";
import toastError from "@/utils/toastErrors";

import "react-toastify/dist/ReactToastify.css";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { Products } from "@/store/ProductStore";
import toastSuccess from "@/utils/toastSuccess";
import { useRouter } from "next/router";

const createProduct = async (productState: Products) => {
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

  return data;
};

const clearSessionStorage = () => {
  sessionStorage.clear();
  
}

export default function SubmitPost() {
  const productState = useStoreState((state) => state.products);
  const clearProducts = useStoreActions((state) => state.clearProducts)
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!checked) {
      toastError(
        "You can not submit post without accept usage of phone number"
      );
    } else {
      const response = await createProduct(productState);

      if (response.status === "success") {
        clearSessionStorage()
        clearProducts()
        toastSuccess("Successfully submitted");
        setTimeout(() => {
          router.push("/");
        }, 1500);
        
      } else{
        toastError('Something went wrong. try again later')
      }
    }
  }

  return (
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
      <div>
        <h3 className="text-2xl font-bold text-center">Submit your product</h3>
        <div className="flex flex-col items-center py-16">
          <h3 className="text-lg">
            Please read below conditions{" "}
            <span className="font-bold underline">CAREFULLY</span>
          </h3>
          <form onSubmit={submitHandler} className="flex flex-col items-center">
            <div className="py-12">
              <CheckboxList checked={checked} setChecked={setChecked} />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-16 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
