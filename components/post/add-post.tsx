import { AddProductContext } from "@/context/AddProduct";
import { addProductSchema } from "@/utils/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import Input from "../shared/ui/input";
import Radio from "../shared/ui/radio";
import Select from "../shared/ui/select";

export default function AddPost() {
  const addProductCtx = useContext(AddProductContext)
  const router = useRouter();
  const schema = addProductSchema();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((value) => {
    if(addProductCtx) {
      console.log(value)
      addProductCtx.addCategory(value.category);
      addProductCtx.addCity(value.city);
      addProductCtx.addGender(value.gender);
      addProductCtx.addImage(value.image);
      addProductCtx.addName(value.name);
    }
  });

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-8 text-3xl font-bold">Add Product</h3>
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-4/5 md:w-3/5 xl:w-2/5 gap-y-10"
      >
        <Input
          id="product-name"
          label="Product name"
          type="text"
          register={register("name")}
          errors={errors.name}
        />
        <Input
          id="product-image"
          label="Product image"
          type="text"
          register={register("image")}
          errors={errors.image}
        />
        <Select
          id="city"
          defaultValue="Kutaisi"
          label="City"
          options={["Kutaisi", "Tbilisi", "Zestafoni"]}
          register={register("city")}
        />
        <Select
          id="category"
          defaultValue="All New Arrivals"
          label="Category"
          options={[
            "All New Arrivals",
            "Household Items",
            "Electronics",
            "Clothes",
            "Other",
          ]}
          register={register("category")}
        />
        <div className="flex flex-col">
          <legend className="block mb-3 text-sm font-medium text-gray-700">
            Choose Gender
          </legend>
          <div className="flex gap-x-6 ">
            <Radio id="male" label="Male" register={register("gender")} />
            <Radio id="female" label="Female" register={register("gender")} />
          </div>
          { errors?.gender?.message && (
            <p className="mt-2 text-sm font-semibold text-rose-600">
              Gender is required
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-16 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
