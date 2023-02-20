/* This example requires Tailwind CSS v2.0+ */
import {
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

interface Offers {
  product1: {
    title: string;
    description: string;
  };
  product2: {
    title: string;
    description: string;
  };
  product3: {
    title: string;
    description: string;
  };
  product4: {
    title: string;
    description: string;
  };
}

const features = (offers: Offers) => {
  const { product1, product2, product3, product4 } = offers;

  return [
    {
      name: product1.title,
      description: product1.description,
      icon: GlobeAltIcon,
    },
    {
      name: product2.title,
      description: product2.description,
      icon: ScaleIcon,
    },
    {
      name: product3.title,
      description: product3.description,
      icon: LightningBoltIcon,
    },
    {
      name: product4.title,
      description: product4.description,
      icon: PhoneIcon,
    },
  ];
};

export default function About() {
  const { t } = useTranslation("home");

  const products = {
    product1: {
      title: t("about.offers.product1.title"),
      description: t("about.offers.product1.description"),
    },
    product2: {
      title: t("about.offers.product2.title"),
      description: t("about.offers.product2.description"),
    },
    product3: {
      title: t("about.offers.product3.title"),
      description: t("about.offers.product3.description"),
    },
    product4: {
      title: t("about.offers.product4.title"),
      description: t("about.offers.product4.description"),
    },
  };

  return (
    <div className="py-20 bg-gray-100" id="about">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
            {t("about.title")}
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            {t("about.header")}
          </p>
          <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
            {t("about.description")}
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features(products).map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">
                    <feature.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
