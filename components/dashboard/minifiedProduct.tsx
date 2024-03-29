import { Dispatch, SetStateAction  } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { GrUpdate } from "react-icons/gr";

import { ProductInterface } from "@/utils/interfaces";
import { translateCity } from "@/utils/georgian-cities";

interface Props {
  product: ProductInterface;
  selectedIds: String[];
  setSelectedIds: Dispatch<SetStateAction<String[]>>;
}

const MinifiedProduct = ({
  product,
  selectedIds,
  setSelectedIds,
}: Props) => {
  const { t } = useTranslation("dashboard");
  const router = useRouter()

  const formattedDate = new Date(product.createdAt).toLocaleString();
  const humanReadableDate = new Date(formattedDate).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleCheckboxChange = (productId: string) => {
    if (selectedIds.includes(productId)) {
      setSelectedIds(selectedIds.filter((id) => id !== productId));
    } else {
      setSelectedIds([...selectedIds, productId]);
    }
  };

  return (
    <>
      
      <li className="relative">
        <Link href={`products/${product._id}`} className="block group">
          <div className="flex items-center px-4 py-5 sm:py-6 sm:px-0">
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex-shrink-0 w-[44px] h-[44px]">
                <Image
                  className="w-full h-full rounded-full group-hover:opacity-75"
                  src={product.imageSrc}
                  alt={product.name}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="text-sm font-medium text-purple-600 truncate">
                    {product.name}
                  </p>
                  <p className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="truncate">
                      {translateCity(product.city, router?.locale)}
                    </span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-900">
                      {t("created")}{" "}
                      <time dateTime={formattedDate}>{humanReadableDate}</time>
                    </p>
                    <p className="flex items-center mt-2 text-sm text-gray-500">
                      <CheckCircleIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      {t("active")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="absolute right-0 flex items-center -translate-y-1/2 gap-x-4 top-1/2">
          <Link
            href={`products/update/${product._id}`}
            className="p-2 bg-gray-100 rounded cursor-pointer"
          >
            <GrUpdate size={20} />
          </Link>
          <div>
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-6 h-6 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
              onChange={() => handleCheckboxChange(product._id)}
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default MinifiedProduct;
