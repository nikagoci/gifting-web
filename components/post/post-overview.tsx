import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { BsPhone } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { useStoreRehydrated } from 'easy-peasy';

import Button from "../shared/ui/button";
import { useStoreState } from "@/store/hooks";
import Spinner from "../shared/ui/spinner";
import { UserInterface } from "@/utils/interfaces";
import { translateCity } from "@/utils/georgian-cities";

interface Props {
  user: UserInterface
}

export default function PostOverview({ user }: Props) {
  const isRehydrated = useStoreRehydrated();
  const productStore = useStoreState((state) => state.products)
  const router = useRouter();
  const { t } = useTranslation('addproduct')

  useEffect(() => {
    if (!productStore.description || !productStore.gender || !productStore.image || !productStore.name) {
      router.push('/post/add-product')
    }
  }, [])

  if (!productStore.description || !productStore.gender || !productStore.image || !productStore.name) {
    return <Spinner size={60} />
  }

  if (!isRehydrated) {
    return <Spinner size={60} />
  }

  const userName = user.email.split("@")[0];

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-bold text-center">
        {t('product-overview.header')}
      </h1>
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="w-full h-[400px] ">
            <Image
              src={productStore?.image}
              alt={productStore?.name}
              className="object-cover object-center w-full h-full"
              width={880}
              height={510}
            />
          </div>

          {/* Product info */}
          <div className="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {productStore?.name}
            </h1>

            <div className="mt-6">
              <div className="space-y-6 text-base text-gray-700" />
              <p>{productStore?.description}</p>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="mb-8 text-xl font-bold">
                {t('product-overview.author')}
              </h2>
              <div className="flex flex-col">
                <div className="px-16 py-6 font-semibold border border-emerald-300 bg-emerald-50 rounded-xl">
                  <div className="flex items-center mb-6 text-xl gap-x-3">
                    <AiOutlineUser className="w-8 h-auto text-emerald-500" />
                    <h6>{userName}</h6>
                  </div>
                  <div className="flex items-center mb-6 text-xl gap-x-3">
                    <BsPhone className="w-8 h-auto text-emerald-500" />
                    <h6>{user.phoneNumber}</h6>
                  </div>
                  <div className="flex items-center mb-6 text-xl gap-x-3">
                    <LocationMarkerIcon className="w-8 h-auto text-emerald-500" />
                    <h6>{translateCity(productStore?.city, router?.locale)}</h6>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Button full href="/post/submit-product" padding="px-16 py-2">
            {t('product-overview.button')}
          </Button>
        </div>
      </div>
    </div>
  );
}
