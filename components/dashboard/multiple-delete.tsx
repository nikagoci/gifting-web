import { ProductInterface } from "@/utils/interfaces";
import { useState } from "react";
import Button from "../shared/ui/button";

interface Props {
  allProduct: ProductInterface[];
}

export default function MultipleDelete({ allProduct }: Props) {

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
          <h3>Total Products: {allProduct.length}</h3>
        <button className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          Remove All
        </button>
      </div>
    </div>
  );
}
