/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

// statuses: complete, current, upcoming 


interface Props {
  status: {
    addProduct: string;
    productOverview: string;
    submitProduct: string;
  }
}

export default function PostSteps({status}: Props) {
  const {t} = useTranslation('addproduct')

  const steps = [
    { id: '01', name: t('add-product.title'), status: status.addProduct },
    { id: '02', name: t('product-overview.title'), status: status.productOverview },
    { id: '03', name: t('submit-product.title'),  status: status.submitProduct },
  ]


  return (
    <nav aria-label="Progress">
      <ol role="list" className="border border-gray-300 divide-y divide-gray-300 rounded-md md:flex md:divide-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex-1 md:flex">
            {step.status === 'complete' ? (
              <Link href={`${step.id=== '01' ? '/post/add-product' : '/post/product-overview'} `} className="flex items-center w-full cursor-pointer group">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                    <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                </span>
              </Link>
            ) : step.status === 'current' ? (
              <div className="flex items-center px-6 py-4 text-sm font-medium cursor-pointer" aria-current="step">
                <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-indigo-600 rounded-full">
                  <span className="text-indigo-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
              </div>
            ) : (
              <div className="flex items-center cursor-pointer group">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                </span>
              </div>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div className="absolute top-0 right-0 hidden w-5 h-full md:block" aria-hidden="true">
                  <svg
                    className="w-full h-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
