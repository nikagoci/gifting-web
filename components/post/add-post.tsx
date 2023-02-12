import { useRouter } from 'next/router';
import {FormEvent} from 'react'

import Input from "../shared/ui/input";
import Radio from "../shared/ui/radio";
import Select from "../shared/ui/select";


export default function AddPost() {
  const router = useRouter();

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Get Data First

    router.push('/post/product-overview')
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-8 text-3xl font-bold">Add Product</h3>
      <form onSubmit={submitHandler} className="flex flex-col w-4/5 md:w-3/5 xl:w-2/5 gap-y-10">
        <Input id="product-name" label="Product name" required type="text" />
        <Input id="product-image" label="Product image" required type="text" />
        <Select
          id="city"
          defaultValue="Kutaisi"
          label="City"
          options={["Kutaisi", "Tbilisi", "Zestafoni"]}
        />
        <Select 
          id='category'
          defaultValue='All New Arrivals'
          label='Category'
          options={['All New Arrivals', 'Household Items', 'Electronics', 'Clothes', 'Other']}
        />
        <div className="flex flex-col">
          <legend className="block mb-3 text-sm font-medium text-gray-700">
            Choose Gender
          </legend>
          <div className="flex gap-x-6 ">
            <Radio id="male" label="Male" />
            <Radio id="female" label="Female" />
          </div>
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
