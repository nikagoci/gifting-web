import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { AiFillWarning } from "react-icons/ai";

import { ProductInterface } from "@/utils/interfaces";
import Modal, { themeEnum } from "../shared/modal";

interface Props {
  selectedIds: String[];
  setAllProduct: Dispatch<SetStateAction<ProductInterface[]>>
}

export default function MultipleDelete({ selectedIds, setAllProduct }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation("dashboard");
  const router = useRouter()

  const handleRemoveProducts = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      {showModal && (
        <Modal
          header="Remove product"
          description="Do you wish to remove product? It can not be restored later."
          option1="Remove"
          option2="Cancel"
          id={selectedIds}
          icon={
            <AiFillWarning
              className="w-6 h-6 text-rose-600"
              aria-hidden="true"
            />
          }
          theme={themeEnum.red}
          setAllProduct={setAllProduct}
          setShowModal={setShowModal}
        />
      )}
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h3>{t('selected-products')}: {selectedIds.length}</h3>
          <button onClick={handleRemoveProducts} className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
            {router?.locale === 'ka' ? `${selectedIds.length === 1 ? 'პროდუქტის' : 'პროდუქტების'} წაშლა` : `Remove ${selectedIds.length === 1 ? 'Product' : 'Products'}`}
          </button>
        </div>
      </div>
    </>
  );
}
