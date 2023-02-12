import Button from "../shared/UI/button"
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
const products = [{
    id: '1',
    rating: 4,
    name: 'Earthen Bottle',
    city: 'Zestafoni',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
  },
  {
    id: '2',
    name: 'Nomad Tumbler',
    city: 'Batumi',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
  },
  {
    id: '3',
    name: 'Focus Paper Refill',
    city: 'Kutaisi',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
  },
  {
    id: '4',
    name: 'Machined Mechanical Pencil',
    city: 'Tbilisi',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
  }]

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
                    <Button full href='/products'>See More</Button>
                </div>
            </div>
        </div>
    )
}