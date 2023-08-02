import { Fragment, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, PlusSmIcon } from "@heroicons/react/solid";

import ProductFull from "./product-full";
import { ProductInterface } from "@/utils/interfaces";

interface Filter {
  gender: {
    title: string;
    label1: string;
    label2: string;
  };
  category: {
    title: string;
    label1: string;
    label2: string;
    label3: string;
    label4: string;
    label5: string;
  };
}

const filters = (newFilters: Filter) => {
  return [
    {
      id: "gender",
      name: newFilters.gender.title,
      options: [
        { value: "male", label: newFilters.gender.label1 },
        { value: "female", label: newFilters.gender.label2 },
      ],
    },
    {
      id: "category",
      name: newFilters.category.title,
      options: [
        { value: "new-arrivals", label: newFilters.category.label1 },
        { value: "household-items", label: newFilters.category.label2 },
        { value: "electronics", label: newFilters.category.label3 },
        { value: "clothes", label: newFilters.category.label4 },
        { value: "other", label: newFilters.category.label5 },
      ],
    },
  ];
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductFilter({
  products,
}: {
  products: ProductInterface[];
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [allFilter, setAllFilter] = useState<{ id: string; value: string }[]>(
    []
  );
  const router = useRouter()

  const { t } = useTranslation("products");

  const newFilters = {
    gender: {
      title: t("categories.gender.title"),
      label1: t("categories.gender.label1"),
      label2: t("categories.gender.label2"),
    },
    category: {
      title: t("categories.category.title"),
      label1: t("categories.category.label1"),
      label2: t("categories.category.label2"),
      label3: t("categories.category.label3"),
      label4: t("categories.category.label4"),
      label5: t("categories.category.label5"),
    },
  };

  function handleInputChange(id: string, value: string) {
    const curIndex: number = allFilter.findIndex((filter) => filter.value === value);

    if (curIndex === -1) {
      setAllFilter((prev) => [
        ...prev,
        {
          id,
          value,
        },
      ]);
    } else {
      setAllFilter(prev => 
        prev.filter(filter => filter.value !== value)
      )
    }

    router.push({pathname: '/products', query: {page: 1}})
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">{t('filters')}</h2>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters(newFilters).map((section) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="pt-4 pb-4 border-t border-gray-200"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="flex items-center ml-6 h-7">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="px-4 pt-4 pb-2">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => {
                                return (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`${section.id}-${optionIdx}-mobile`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                      onClick={() =>
                                        handleInputChange(section.id, option.value)
                                      }
                                    />
                                    <label
                                      htmlFor={`${section.id}-${optionIdx}-mobile`}
                                      className="ml-3 text-sm text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside >
              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  {t('filters')}
                </span>
                <PlusSmIcon
                  className="flex-shrink-0 w-5 h-5 ml-1 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-gray-200">
                  {filters(newFilters).map((section, sectionIdx) => (
                    <div
                      key={section.name}
                      className={sectionIdx === 0 ? "" : "pt-10"}
                    >
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">
                          {section.name}
                        </legend>
                        <div className="pt-6 space-y-3">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                // checked={inputChecked}
                                defaultValue={option.value}
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                onClick={() =>
                                  handleInputChange(section.id, option.value)
                                }
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}

                </form>
              </div>
            </aside>

            {/* Product grid */}
            <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
              {/* Replace with your content */}
              <ProductFull products={products} filters={allFilter} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
