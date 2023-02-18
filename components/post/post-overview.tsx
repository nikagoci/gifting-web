import { BsPhone } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import Button from "../shared/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStoreState } from "@/store/hooks";
import { useStoreRehydrated } from 'easy-peasy';
import Image from "next/image";

interface Props {
  user: {
    _id: string;
    email: string;
    password: string;
    phoneNumber: string;
  };
}

export default function PostOverview({ user }: Props) {
  const isRehydrated = useStoreRehydrated();
  const productStore = useStoreState((state) => state.products)
  const router = useRouter();
  
  useEffect(() => {
    
    if(!productStore.description || !productStore.gender || !productStore.image || !productStore.name) {
      router.push('/post/add-product')
    }

  }, [])

  if(!productStore.description || !productStore.gender || !productStore.image || !productStore.name) {
    return <h1>Loading...</h1>
  }

  if(!isRehydrated) {
    return <h1>Loading...</h1>
  }


  const userName = user.email.split("@")[0];

  function myLoader() {
    return productStore?.image
  }

    return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <Image
            loader={myLoader}
            src={productStore?.image}
            alt={productStore?.name}
            className="object-cover object-center h-full"
            width={1200}
            height={900}
          />

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
                Author Contact
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
                    <h6>{productStore?.city}</h6>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Button full href="/post/submit-product" padding="px-16 py-2">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
