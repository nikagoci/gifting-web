import Button from "../shared/button"
import SingleProduct from "../shared/single-product"

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
    {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        city: 'Zestafoni',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    },
    {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        city: 'Batumi',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    },
    {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        city: 'Kutaisi',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    },
    {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        city: 'Tbilisi',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    }
]

export default function ProductMini() {
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
                        <SingleProduct key={product.id} product={product} />
                    ))}
                </div>
                <div className="flex justify-center mt-16">
                    <Button full href='/'>See More</Button>
                </div>
            </div>
        </div>
    )
}