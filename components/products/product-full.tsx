import Link from "next/link"
import SingleProduct from "../shared/single-product"
import Pagination from "./pagination"

/*
  This example requires Tailwind CSS v2.0+

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
      id: '1',
      rating: 4,
      name: 'Earthen Bottle',
      city: 'Zestafoni',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
    },
    {
      id: '2',
      rating: 4,
      name: 'Nomad Tumbler',
      city: 'Batumi',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
    },
    {
      id: '3',
      rating: 4,
      name: 'Focus Paper Refill',
      city: 'Kutaisi',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
    },
    {
      id: '4',
      rating: 4,
      name: 'Machined Mechanical Pencil',
      city: 'Tbilisi',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
    },
    {
      id: '5',
      rating: 4,
      name: 'Machined Mechanical Pencil',
      city: 'Tbilisi',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
    },
    {
      id: '6',
      rating: 4,
      name: 'Machined Mechanical Pencil',
      city: 'Tbilisi',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
    },
    {
      id: '7',
      rating: 4,
      name: 'Machined Mechanical Pencil',
      city: 'Tbilisi',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
    },
    {
      id: '8',
      rating: 4,
      name: 'Machined Mechanical Pencil',
      city: 'Tbilisi',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
    },
  ]
  
  export default function ProductFull() {
    return (
      <div className="bg-white">
        <div className="max-w-2xl px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
  
          <div className="grid grid-cols-1 mb-8 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <SingleProduct key={product.id} product={product} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    )
  }
  