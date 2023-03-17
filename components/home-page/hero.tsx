import Button from "../shared/ui/button";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function Hero() {
  const { status } = useSession();
  const { t } = useTranslation("home");

  return (
    <header className="flex items-center bg-[#fbfbfb] full-height gap-y-6">
      <div className="flex flex-col items-center w-full h-full px-4 mx-auto xl:flex-row max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center flex-1 h-full xl:items-start gap-y-4">
          <h1 className="text-4xl tracking-tight text-center text-gray-900 xl:text-start sm:text-5xl md:text-6xl">
            <span className="block mb-2 font-bold">{t("hero.title1")}</span>{" "}
            <span className="font-extrabold text-indigo-600">
              {t("hero.title2")}
            </span>
          </h1>
          <p className="max-w-md mx-auto mt-3 text-base text-center xl:text-start sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t("hero.description")}
          </p>
          <div className="max-w-md mt-5 sm:flex md:mt-8">
            <div className="rounded-md shadow">
              <Button full href="/products/?page=1" padding="py-3 px-12">
                {t("hero.see product")}
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button
                href={`${
                  status === "unauthenticated" ? "signup" : "/post/add-product"
                }`}
                padding="py-3 px-12"
              >
                {t("hero.add product")}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-2 xl:mt-0 xl:h-full ">
          <div className="flex items-center justify-end w-full xl:h-full xl:ml-10">
            <Image
              src="/header.png"
              alt="present"
              className="rounded-3xl"
              width={505}
              height={600}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
