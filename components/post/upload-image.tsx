import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useStoreRehydrated } from "easy-peasy";

import { useStoreState } from "@/store/hooks";

export default function UploadImage({
  setImageUrl,
}: {
  setImageUrl: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState("");
  const isRehydrated = useStoreRehydrated();

  const productState = useStoreState((state) => state.products);
  if (!isRehydrated) return <></>;

  const openUploadWidget = () => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
    (window as any).cloudinary
      .createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: preset,
          sources: ["local", "url"],
          multiple: false,
          maxFileSize: 5000000,
          maxImageWidth: 1500,
          maxImageHeight: 1500,
          cropping: true,
          showCompletedButton: true,
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            setImageUrl(result.info.url);
          } else {
            setError(error);
          }
        }
      )
      .open();
  };

  return (
    <>
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      />
      <div>
        <button
          className="block w-full py-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type='button'
          onClick={openUploadWidget}
        >
          Upload Image
        </button>
        {productState.image && (
          <div className="flex justify-center">

          <div className="w-[400px] h-[400px]">

            <Image
              className="object-cover w-full h-full my-4 rounded-xl"
              width={400}
              height={400}
              src={productState.image}
              alt={productState.image}
              />
          </div>
              </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
