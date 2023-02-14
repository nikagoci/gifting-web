/* This example requires Tailwind CSS v2.0+ */
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";

export default function Pagination() {
  const [curPage, setCurPage] = useState(1);
  const [productQuantity, setProductQuantity] = useState(0);
  const [totalPages, setTotalPages] = useState<number[]>([]);

  const PAGE_RANGE = 2;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProductQuantity(data.quantity);
      setCurPage(1);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (productQuantity) {
      const total = Math.ceil(productQuantity / 1);

      for (let i = 1; i <= total; i++) {
        setTotalPages((prev: number[]) => [...prev, i]);
      }
    }
  }, [productQuantity]);

  function handlePageChange(page: number) {
    setCurPage(page);
  }

  function handlePageInc() {
    const total = Math.ceil(productQuantity / 1);
    setCurPage((prev) => prev + 1);

    if (curPage >= total) {
      setCurPage(total);
    }
  }

  function handlePageDec() {
    setCurPage((prev) => prev - 1);

    if (curPage === 1) {
      setCurPage(1);
    }
  }
  const active =
    "inline-flex items-center px-4 pt-4 text-sm font-medium text-indigo-600 border-t-2 border-indigo-500";
  const notActive =
    "inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300";

  return (
    <nav className="flex items-center justify-between px-4 border-t border-gray-200 sm:px-0">
      <div className="flex flex-1 w-0 -mt-px">
        <a
          href="#"
          className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
          onClick={handlePageDec}
        >
          <ArrowNarrowLeftIcon
            className="w-5 h-5 mr-3 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {/* Defualt Navigation */}
        {totalPages && (
          <>
            {curPage > 3 && (
              <>
                <a
                  href="#"
                  className={notActive}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </a>
                {curPage > PAGE_RANGE && (
                  <span className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent">
                    ...
                  </span>
                )}
              </>
            )}
            {totalPages
              .filter((page) => Math.abs(page - curPage) <= PAGE_RANGE)
              .map((page) => (
                <a
                  key={page}
                  href="#"
                  className={curPage === page ? active : notActive}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </a>
              ))}
            {totalPages.length - curPage > PAGE_RANGE && (
              <>
                {totalPages.length - curPage > PAGE_RANGE && (
                  <span className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent">
                    ...
                  </span>
                )}
                <a
                  href="#"
                  className={notActive}
                  onClick={() => handlePageChange(totalPages.length)}
                >
                  {totalPages.length}
                </a>
              </>
            )}
          </>
        )}
      </div>
      <div className="flex justify-end flex-1 w-0 -mt-px">
        <a
          href="#"
          className="inline-flex items-center pt-4 pl-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
          onClick={handlePageInc}
        >
          Next
          <ArrowNarrowRightIcon
            className="w-5 h-5 ml-3 text-gray-400"
            aria-hidden="true"
          />
        </a>
      </div>
    </nav>
  );
}
