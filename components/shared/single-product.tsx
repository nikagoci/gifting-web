import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { translateCity } from "@/utils/georgian-cities";
import { ProductInterface } from "@/utils/interfaces";
import { LocationMarkerIcon } from "@heroicons/react/outline";


export default function SingleProduct({ product }: { product: ProductInterface }) {
    const router = useRouter()

    return (
        <Link key={product._id} href={`/products/${product._id}`} className="group ">
            <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                <Image
                    src={product.imageSrc}
                    alt={product.name}
                    className="object-cover object-fit group-hover:opacity-75"
                    width={640}
                    height={300}
                    priority
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <div className="flex items-center gap-x-1">
                <LocationMarkerIcon className="w-5 h-4 mt-1" />
                <p className="mt-1 text-lg font-medium text-gray-900">
                    {translateCity(product.city, router?.locale)}
                </p>
            </div>
        </Link>
    )
}