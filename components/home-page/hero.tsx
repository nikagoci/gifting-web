import Button from "../shared/ui/button";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

export default function Hero() {
  const { status } = useSession();
  const { t } = useTranslation('home')

  return (
    <header className="flex flex-col items-center justify-center h-full full-height gap-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">{t('hero.title1')}</span>{" "}
        <span className="block text-indigo-600 xl:inline">{t('hero.title2')}</span>
      </h1>
      <p className="max-w-md mx-auto mt-3 text-base text-center sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        {t('hero.description')}
      </p>
      <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
        <div className="rounded-md shadow">
          <Button full href="/products/?page=1" padding="py-3 px-12">
            {t('hero.see product')}
          </Button>
        </div>
        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
          <Button
            href={`${
              status === "unauthenticated" ? "signup" : "/post/add-product"
            }`}
            padding="py-3 px-12"
          >
            {t('hero.add product')}
          </Button>
        </div>
      </div>
    </header>
  );
}
