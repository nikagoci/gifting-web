import { BsPhone } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { ProductInterface } from "@/utils/interfaces";

interface Product {
  id: string;
  rating: number;
  name: string;
  city: string;
  imageSrc: string;
  description: string;
}

const user = {
  userName: "Zaza",
  phone: "577-77-99-66",
};

export default function ProductOverview({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <>
      {!product && <h1>Loading...</h1>}
      {product && (
        <div className="bg-white">
          <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              <img
                src={product.imageSrc}
                alt={product.name}
                className="object-cover object-center w-full h-full"
              />

              {/* Product info */}
              <div className="flex flex-col justify-center h-full px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  {product.name}
                </h1>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">
                    Product Condition:{" "}
                    <span
                      className={`font-bold tracking-wide ${
                        product.condition === "Used"
                          ? "text-red-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {product.condition}
                    </span>
                  </h3>
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
          </div>
        </div>
      )}
    </>
  );
}
