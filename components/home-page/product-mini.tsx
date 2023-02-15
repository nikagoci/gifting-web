import Button from "../shared/ui/button"
import SingleProduct from "../shared/single-product"
import { ProductInterface } from "@/utils/interfaces"



export default function ProductMini({products}: {products: ProductInterface[]}) {
    return (
        <div className="bg-white">
            <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:text-center">
                    <h3 className="mt-2 mb-12 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                        Products
                    </h3>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <SingleProduct key={product._id} product={product} />
                    ))}
                </div>
                <div className="flex justify-center mt-16">
                    <Button full href='/products/?page=1'>See More</Button>
                </div>
            </div>
        </div>
    )
}