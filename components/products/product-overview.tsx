import { Tab } from '@headlessui/react'
import { BsPhone } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { StarIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';


interface Product {
  id: string;
  rating: number;
  name: string;
  href: string;
  city: string;
  imageSrc: string;
  description: string;
}

const products = [
  {
    id: '1',
    rating: 4,
    name: 'Earthen Bottle',
    href: '#',
    city: 'Zestafoni',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
  },
  {
    id: '2',
    rating: 4,
    name: 'Nomad Tumbler',
    href: '#',
    city: 'Batumi',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
  },
  {
    id: '3',
    rating: 4,
    name: 'Focus Paper Refill',
    href: '#',
    city: 'Kutaisi',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
  },
  {
    id: '4',
    rating: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    city: 'Tbilisi',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    description: 'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.'
  }
]

const user = {
  userName: 'Zaza',
  phone: '577-77-99-66',
  city: 'Kutaisi'
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductOverview() {
  const router = useRouter();
  let product: Product | null = null;

  if (router.query.productId) {
    let element = products.find(el => el.id === router.query.productId)
    if(!element) {
      router.replace('/404')
      return
    }
    if (element) {
      product = element
    }
  }


  return (
    <>
    {!product && (
       <h1>Loading...</h1>
    )} 
      {product && (
        <div className="bg-white">
          <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              {/* Image gallery */}
              <img src={product.imageSrc} alt={product.name} className="object-cover object-center w-full h-full" />

              {/* Product info */}
              <div className="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

                {/* Reviews */}
                <div className="mt-3">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product && product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div
                    className="space-y-6 text-base text-gray-700"
                  />
                  <p>{product.description}</p>
                </div>

                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="mb-8 text-xl font-bold">
                    Author Contact
                  </h2>
                  <div className='flex flex-col'>
                    <div className='px-16 py-6 font-semibold border border-emerald-300 bg-emerald-50 rounded-xl'>
                      <div className='flex items-center mb-6 text-xl gap-x-3'>
                        <AiOutlineUser className='w-8 h-auto text-emerald-500' />
                        <h6>{user.userName}</h6>
                      </div>
                      <div className='flex items-center mb-6 text-xl gap-x-3'>
                        <BsPhone className='w-8 h-auto text-emerald-500' />
                        <h6>{user.phone}</h6>
                      </div>
                      <div className='flex items-center mb-6 text-xl gap-x-3'>
                        <LocationMarkerIcon className='w-8 h-auto text-emerald-500' />
                        <h6>{user.city}</h6>
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

  )
}
