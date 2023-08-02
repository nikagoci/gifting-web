import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import toastError from "@/utils/toastErrors";
import { signUpSchema } from "@/utils/formSchema";
import Input from "../shared/ui/input";

import "react-toastify/dist/ReactToastify.css";

async function createUser(
  email: string,
  password: string,
  phoneNumber: string
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, phoneNumber }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export default function SignpUser() {
  const { t } = useTranslation("registration");
  const router = useRouter();

  const schema = signUpSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (value) => {
    try {
      const result = await createUser(
        value.email,
        value.password,
        value.phoneNumber
      );
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: value.email,
        password: value.password,
      });

      if (signInResult && signInResult.error) {
        toastError(signInResult.error);
      } else if (
        signInResult &&
        !signInResult.error &&
        result.status === "success"
      ) {
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
      <div className="flex flex-col justify-center min-h-screen bg-gray-50 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto"
            src="/logo.png"
            alt="Workflow"
            width={100}
            height={70}
          />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            {t("signup.title")}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              <Input
                id="email"
                label={t("signup.email")}
                type="text"
                register={register("email")}
                errors={errors.email}
              />
              <Input
                id="password"
                label={t("signup.password")}
                type="password"
                register={register("password")}
                errors={errors.password}
              />
              <Input
                id="passwordConfirm"
                label={t("signup.confirm password")}
                type="password"
                register={register("confirmPassword")}
                errors={errors.confirmPassword}
              />
              <Input
                id="phone"
                label={t("signup.phone number")}
                type="text"
                register={register("phoneNumber")}
                errors={errors.phoneNumber}
              />

              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 mb-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t("signup.sign up")}
                </button>
                <div className="mt-4 text-center">
                  {t("signup.account")}{" "}
                  <Link href="/login" className="text-indigo-600 underline">
                    {t("signup.sign in")}
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
