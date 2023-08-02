import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../shared/ui/input";
import { signIn } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import toastError from "@/utils/toastErrors";
import { loginSchema } from "@/utils/formSchema";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function LoginUser() {
  const router = useRouter();
  const schema = loginSchema();
  const { t } = useTranslation("registration");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (value) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: value.email,
        password: value.password,
      });

      if (result && result.error) {
        toastError(result.error);
      } else if (result && !result.error) {
        router.push("/");
      }
    } catch (err: any) {
      toastError(err.message);
    }
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        theme="light"
      />
      <div className="flex flex-col justify-center min-h-[80vh] bg-gray-50 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto"
            src="/logo.png"
            alt="Workflow"
            width={100}
            height={70}
          />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            {t("login.title")}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form onSubmit={onSubmit} className="space-y-8">
              <Input
                id="email"
                errors={errors.email}
                label={t("login.email")}
                register={register("email")}
                type="text"
              />

              <Input
                id="password"
                errors={errors.password}
                label={t("login.password")}
                register={register("password")}
                type="password"
              />


              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 mb-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t("login.sign in")}
                </button>
                <div className="mt-4 text-center">
                  {t("login.account")}{" "}
                  <Link href="/signup" className="text-indigo-600 underline">
                    {t("login.sign up")}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
