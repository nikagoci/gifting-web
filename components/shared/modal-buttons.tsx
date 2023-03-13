import { ProductInterface } from "@/utils/interfaces";
import toastError from "@/utils/toastErrors";
import Link from "next/link";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { themeEnum } from "./modal";

interface Props {
  theme: themeEnum;
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  option1: string;
  option2: string;
  cancelButtonRef: MutableRefObject<null>;
  setAllProduct?: Dispatch<SetStateAction<ProductInterface[]>>;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
}

const removeProductFromDB = async (
  id: string,
  setAllProduct: Dispatch<SetStateAction<ProductInterface[]>>
) => {
  try {
    const res = await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAllProduct((prev) => prev.filter((product) => product._id !== id));
    }
  } catch (err: any) {
    toastError(err);
  }
};

export default function ModalButtons({
  theme,
  id,
  setOpen,
  option1,
  option2,
  cancelButtonRef,
  setAllProduct,
  setShowModal
}: Props) {
  const handleModalClose = () => {
    setOpen(false)
    if(setShowModal){
      setShowModal(false)
    }
  }

  if (setAllProduct && theme === themeEnum.red) {
    return (
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
          onClick={() => removeProductFromDB(id, setAllProduct)}
        >
          {option1}
        </button>
        <button
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 duration-200 transform bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={handleModalClose}
          ref={cancelButtonRef}
        >
          {option2}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
      <Link
        href={`/products/${id}`}
        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
        onClick={() => setOpen(false)}
      >
        {option1}
      </Link>
      <Link
        href="/"
        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
        onClick={() => setOpen(false)}
        ref={cancelButtonRef}
      >
        {option2}
      </Link>
    </div>
  );
}
