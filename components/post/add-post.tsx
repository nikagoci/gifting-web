import { useStoreActions, useStoreState } from "@/store/hooks";
import { addProductSchema } from "@/utils/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Input from "../shared/ui/input";
import Select from "../shared/ui/select";
import Textarea from "../shared/ui/textarea";

export default function AddPost() {
  const router = useRouter();
  const schema = addProductSchema();
  const {t}= useTranslation('addproduct') 

  const productState = useStoreState((state) => state.products);
  const addCategory = useStoreActions((state) => state.addCategory);
  const addCity = useStoreActions((state) => state.addCity);
  const addDescription = useStoreActions((state) => state.addDescription);
  const addGender = useStoreActions((state) => state.addGender);
  const addImage = useStoreActions((state) => state.addImage);
  const addName = useStoreActions((state) => state.addName);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((value) => {
    router.push("/post/product-overview");
  });

  function changeHandler(id: string, value: string) {
    if (id === "product-name") {
      addName(value);
    } else if (id === "product-image") {
      addImage(value);
    } else if(id=== 'description'){
      addDescription(value)
    } else if(id === 'city'){
      addCity(value)
    } else if(id=== 'category'){
      addCategory(value);
    } else if(id=== 'gender'){
      addGender(value)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-8 text-3xl font-bold">Add Product</h3>
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-4/5 md:w-3/5 xl:w-2/5 gap-y-10"
      >
        <Input
          id="product-name"
          label={t('add-product.name')}
          type="text"
          register={register("name")}
          errors={errors.name}
          value={productState.name}
          onChange={changeHandler}
        />
        <Input
          id="product-image"
          label={t('add-product.image')}
          type="text"
          register={register("image")}
          errors={errors.image}
          value={productState.image}
          onChange={changeHandler}
        />
        <Textarea
          id="description"
          label={t('add-product.description')}
          register={register("description")}
          errors={errors.description}
          value={productState.description}
          onChange={changeHandler}
        />
        <Select
          id="city"
          label={t('add-product.city')}
          options={["Tbilisi", "Kutaisi", "Zestafoni"]}
          register={register("city")}
          defaultValue={productState.city}
          onChange={changeHandler}
        />
        <Select
          id="category"
          label={t('add-product.category')}
          options={[
            t('add-product.values.category.label1'),
            t('add-product.values.category.label2'),
            t('add-product.values.category.label3'),
            t('add-product.values.category.label4'),
            t('add-product.values.category.label5'),
          ]}
          register={register("category")}
          defaultValue={productState.category}
          onChange={changeHandler}
        />
        <div className="flex flex-col">
          <legend className="block mb-3 text-sm font-medium text-gray-700">
            {t('add-product.gender')}
          </legend>
          <div className="flex gap-x-6 ">
              <div className="flex items-center justify-center" onChange={() => changeHandler('gender', 'male')}> 
                <label htmlFor='male' className="mr-2">{t('add-product.values.gender.label1')}</label>
                <input value='male' type="radio" id='male' {...register("gender")} checked={productState.gender === 'male'} />
            </div>
        <div className="flex items-center justify-center" onChange={() => changeHandler('gender', 'female')}> 
            <label htmlFor="female" className="mr-2">{t('add-product.values.gender.label2')}</label>
            <input value="female" type="radio"  id="female" {...register("gender")} checked={productState.gender === 'female'} />
        </div>
          </div>
          {errors?.gender?.message && (
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
