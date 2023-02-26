import { ProductInterface } from "@/utils/interfaces";
import Image from "next/image";
import Link from "next/link";

import { CheckCircleIcon } from "@heroicons/react/solid";
import { BsTrash } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import capitalizeWord from "@/utils/capitalizeWord";

const removeProductFromDB = async (
  id: string,
  setAllProduct: Dispatch<SetStateAction<ProductInterface[]>>
) => {
  const res = await fetch(`http://localhost:3000/api/product/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    setAllProduct((prev) => prev.filter((product) => product._id !== id));
  }
};

const MinifiedProduct = ({
  product,
  setAllProduct,
}: {
  product: ProductInterface;
  setAllProduct: Dispatch<SetStateAction<ProductInterface[]>>;
}) => {
  const {t} = useTranslation('dashboard')

  const formattedDate = new Date(product.createdAt).toLocaleString();
  const humanReadableDate = new Date(formattedDate).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });


  const handleRemoveProduct = () => {
    removeProductFromDB(product._id, setAllProduct);
  };

  function myLoader() {
    return product.imageSrc;
  }

  return (
    <li className="relative">
      <Link href={`products/${product._id}`} className="block group">
        <div className="flex items-center px-4 py-5 sm:py-6 sm:px-0">
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex-shrink-0">
              <Image
                loader={myLoader}
                className="rounded-full group-hover:opacity-75"
                src={product.imageSrc}
                alt={product.name}
                width={24}
                height={24}
              />
            </div>
            <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p className="text-sm font-medium text-purple-600 truncate">
                  {product.name}
                </p>
                <p className="flex items-center mt-2 text-sm text-gray-500">
                  <span className="truncate">{capitalizeWord(product.city)}</span>
                </p>
              </div>
              <div className="hidden md:block">
                <div>
                  <p className="text-sm text-gray-900">
                    {t('created')}{" "}
                    <time dateTime={formattedDate}>{humanReadableDate}</time>
                  </p>
                  <p className="flex items-center mt-2 text-sm text-gray-500">
                    <CheckCircleIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                     {t('active')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute right-0 flex -translate-y-1/2 gap-x-4 top-1/2">
        <div className="p-2 bg-gray-100 rounded cursor-pointer">
          <GrUpdate size={20} />
        </div>
        <div
          className="p-2 bg-gray-100 rounded cursor-pointer"
          onClick={handleRemoveProduct}
        >
          <BsTrash size={20} color="red" />
        </div>
      </div>
    </li>
  );
};

export default MinifiedProduct;
