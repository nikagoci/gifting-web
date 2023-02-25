import { getValuesFromFilter } from "@/utils/getValuesFromFilter";
import { ProductInterface } from "@/utils/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SingleProduct from "../shared/single-product";
import Pagination from "./pagination";

interface Props {
  products: ProductInterface[];
  filters: { id: string; value: string }[];
}

async function fetchData(
  setAllProduct: Dispatch<SetStateAction<ProductInterface[]>>,
  setProductQuantity: Dispatch<SetStateAction<number>>,
  page: number,
  categories: string,
  genders: string
) {
  const url = `/api/products?page=${page}&limit=8${
    categories && "&category=" + categories
  }${genders && "&gender=" + genders}`;
  const res = await fetch(url);
  const data = await res.json();

  setProductQuantity(data.totalQuantity);
  setAllProduct(data.products);
}

export default function ProductFull({ products, filters }: Props) {
  const [allProduct, setAllProduct] = useState(products);
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [error, setError] = useState(false);
  const [curPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const category = getValuesFromFilter(filters).strCategories;
    const gender = getValuesFromFilter(filters).strGenders;
    fetchData(setAllProduct, setProductQuantity, curPage, category, gender);
  }, [curPage, filters]);

  useEffect(() => {
    if (allProduct.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [productQuantity]);

  const getCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  if (error) {
    return (
      <div className="bg-white">
        <div className="flex justify-center max-w-2xl px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-lg font-bold text-rose-600">
            No Product Found! Please try again with different filters
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 mb-8 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {allProduct.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))}
        </div>
        <Pagination
          getCurrentPage={getCurrentPage}
          totalQuantity={productQuantity}
        />
      </div>
    </div>
  );
}
