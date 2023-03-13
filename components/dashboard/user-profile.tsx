import { UserInterface } from "@/utils/interfaces";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: UserInterface;
}

export default function UserProfile({ user }: Props) {
  const { t } = useTranslation("dashboard");
  const userName = user.email.split("@")[0];

  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
      <div className="flex items-center py-8 space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              className="rounded-full"
              src="/user.png"
              alt="user"
              width={42}
              height={42}
            />
            <span
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
          <p className="text-sm font-medium text-gray-500">
            {t("email")}-<span className="text-gray-900">{user.email}</span>{" "}
          </p>
          <p className="text-sm font-medium text-gray-500">
            {t("phone")}-
            <span className="text-gray-900">{user.phoneNumber}</span>{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
        <Link
          href="/post/add-product"
          className="inline-flex items-center justify-center px-8 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        >
          {t("add")}
        </Link>
      </div>
    </div>
  );
}
