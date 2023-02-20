/* This example requires Tailwind CSS v2.0+ */
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PAGE_RANGE = 2;
const totalPageCalc = (productQuantity: number): number => {
  return Math.ceil(productQuantity / 8);
};

export default function Pagination() {
  const [curPage, setCurPage] = useState(1);
  const [productQuantity, setProductQuantity] = useState(0);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const router = useRouter();
  const {t} = useTranslation('products')

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProductQuantity(data.quantity);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!router.query.page) {
      setTimeout(() => {
        router.push({
          pathname: "/products",
          query: { page: 1 },
        });
      }, 500);
    }

    if (
      (router.query.page && +router.query.page <= 1) ||
      (router.query.page && +router.query.page > totalPages.length)
    ) {
      setCurPage(1);
      router.push({
        pathname: "/products",
        query: { page: 1 },
      });
    } else if (router.query.page) {
      setCurPage(+router.query.page);
    }
  }, [router.query.page]);

  useEffect(() => {
    if (productQuantity) {
      const total = totalPageCalc(productQuantity);

      for (let i = 1; i <= total; i++) {
        setTotalPages((prev: number[]) => [...prev, i]);
      }
    }
  }, [productQuantity]);

  function handlePageChange(page: number) {
    setCurPage(page);
    router.push({
      pathname: "/products",
      query: { page },
    });
  }

  function handlePageInc() {
    const total = totalPageCalc(productQuantity);
    setCurPage((prev) => prev + 1);

    if (router.query.page && +router.query.page >= totalPages.length) {
      router.push({
        pathname: "/products",
        query: { page: totalPages.length },
      });
    } else {
      router.push({
        pathname: "/products",
        query: { page: router.query.page && +router.query.page + 1 },
      });
    }

    if (curPage >= total) {
      setCurPage(total);
    }
  }

  function handlePageDec() {
    setCurPage((prev) => prev - 1);

    if (router.query.page && +router.query.page <= 1) {
      router.push({
        pathname: "/products",
        query: { page: 1 },
      });
    } else {
      router.push({
        pathname: "/products",
        query: { page: router.query.page && +router.query.page - 1 },
      });
    }

    if (curPage === 1) {
      setCurPage(1);
    }
  }

  const active =
    "cursor-pointer inline-flex items-center px-4 pt-4 text-sm font-medium text-indigo-600 border-t-2 border-indigo-500";
  const notActive =
    "cursor-pointer inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300";

  return (
    <nav className="flex items-center justify-between px-4 border-t border-gray-200 sm:px-0">
      <div className="flex flex-1 w-0 -mt-px">
        <div
          className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent cursor-pointer hover:text-gray-700 hover:border-gray-300"
          onClick={handlePageDec}
        >
          <ArrowNarrowLeftIcon
            className="w-5 h-5 mr-3 text-gray-400"
            aria-hidden="true"
          />
          {t('pagination.previous')}
        </div>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {/* Defualt Navigation */}
        {totalPages && (
          <>
            {curPage > 3 && (
              <>
                <div className={notActive} onClick={() => handlePageChange(1)}>
                  1
                </div>
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
                <div
                  key={page}
                  className={curPage === page ? active : notActive}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </div>
              ))}
            {totalPages.length - curPage > PAGE_RANGE && (
              <>
                {totalPages.length - curPage > PAGE_RANGE && (
                  <span className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent">
                    ...
                  </span>
                )}
                <div
                  className={notActive}
                  onClick={() => handlePageChange(totalPages.length)}
                >
                  {totalPages.length}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="flex justify-end flex-1 w-0 -mt-px">
        <div
          className="inline-flex pt-4 pl-1 text-sm font-medium text-gray-500 border-t-2 border-transparent cursor-pointer itcursor-pointer ems-center hover:text-gray-700 hover:border-gray-300"
          onClick={handlePageInc}
        >
          {t('pagination.next')}
          <ArrowNarrowRightIcon
            className="w-5 h-5 ml-3 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </nav>
  );
}
