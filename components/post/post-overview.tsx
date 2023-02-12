import { BsPhone } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import Button from "../shared/ui/button";

const user = {
  userName: "Zaza",
  phone: "577-77-99-66",
};

const product = {
  id: "11",
  name: "dog",
  city: "Kutaisi",
  imageSrc: "https://picsum.photos/id/237/536/354",
  description: "A little dog",
  rating: 5,
};

export default function PostOverview() {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <img
            src={product.imageSrc}
            alt={product.name}
            className="object-cover object-center w-full h-full"
          />

          {/* Product info */}
          <div className="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* Reviews */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product && product.rating > rating
                          ? "text-indigo-500"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="space-y-6 text-base text-gray-700" />
              <p>{product.description}</p>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="mb-8 text-xl font-bold">
                Author Contact
              </h2>
              <div className="flex flex-col">
                <div className="px-16 py-6 font-semibold border border-emerald-300 bg-emerald-50 rounded-xl">
                  <div className="flex items-center mb-6 text-xl gap-x-3">
                    <AiOutlineUser className="w-8 h-auto text-emerald-500" />
                    <h6>{user.userName}</h6>
                  </div>
                  <div className="flex items-center mb-6 text-xl gap-x-3">
                    <BsPhone className="w-8 h-auto text-emerald-500" />
                    <h6>{user.phone}</h6>
                  </div>
                  <div className="flex items-center mb-6 text-xl gap-x-3">
                    <LocationMarkerIcon className="w-8 h-auto text-emerald-500" />
                    <h6>{product.city}</h6>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Button full href="/post/submit-product" padding='px-16 py-2'>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
