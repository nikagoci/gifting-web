import { useStoreState } from "@/store/hooks";
import { useStoreRehydrated } from "easy-peasy";
import Image from "next/image";
import Script from "next/script";
import { Dispatch, SetStateAction, useState } from "react";

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
          type="button"
          className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={openUploadWidget}
        >
          Upload Image
        </button>
        {productState.image && (
          <Image
            className="my-4 rounded-xl"
            width={220}
            height={150}
            src={productState.image}
            alt={productState.image}
          />
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
