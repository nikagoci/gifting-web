import React from 'react'

import {
    CheckCircleIcon,
    ChevronRightIcon,
  } from '@heroicons/react/solid'
import { ProductInterface } from '@/utils/interfaces'
import Image from 'next/image'
import Link from 'next/link'

const MinifiedProduct = ({product}: {product: ProductInterface}) => {
  
  function myLoader() {
    return product.imageSrc
  }

  const capitalizedCity = product.city.charAt(0).toUpperCase()+ product.city.slice(1, product.city.length)

  return (
    <li>
    <Link href={`products/${product._id}`} className="block group">
      <div className="flex items-center px-4 py-5 sm:py-6 sm:px-0">
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex-shrink-0">
            <Image
            loader={myLoader}
              className="rounded-full group-hover:opacity-75"
              src={product.imageSrc}
              alt={product.name}
              width={24}
              height={24}
            />
          </div>
          <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p className="text-sm font-medium text-purple-600 truncate">{product.name}</p>
              <p className="flex items-center mt-2 text-sm text-gray-500">
                <span className="truncate">{capitalizedCity}</span>
              </p>
            </div>
            <div className="hidden md:block">
              <div>
                <p className="flex items-center mt-2 text-sm text-gray-500">
                  <CheckCircleIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                  Currently Active
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ChevronRightIcon
            className="w-5 h-5 text-gray-400 group-hover:text-gray-700"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  </li>
  )
}

export default MinifiedProduct