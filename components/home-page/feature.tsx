/* This example requires Tailwind CSS v2.0+ */
import { GlobeAltIcon, LightningBoltIcon, ScaleIcon, PhoneIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Fast and simple',
    description:
      'You can access anyone around the georgia within seconds and get free stuff or be the one who gives free stuff.',
    icon: GlobeAltIcon,
  },
  {
    name: 'No hidden fees',
    description:
      'Usage of XXXXX is completly free. There are no hidden fees or any other payment system. You can use website without acctualy loose anything.',
    icon: ScaleIcon,
  },
  {
    name: 'Transfers are instant',
    description:
      'Our sponsors who will receive products will get you as fast as possible. The maximum transfer time will be two days.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Direct contact',
    description:
      "Our website offers to contact sellers directly through their phones or emails. That's can save a lot of your time.",
    icon: PhoneIcon,
  },
]

export default function Feature() {
  return (
    <div className="py-20 bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Transactions</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            A better way to help people
          </p>
          <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
            We are doing everything to help poor people. We think kindness should be goal of our lives. Thats why we offer XXXX.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">
                    <feature.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
