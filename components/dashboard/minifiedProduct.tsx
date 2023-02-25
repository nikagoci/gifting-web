import React from 'react'

import {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CurrencyDollarIcon,
    LinkIcon,
    LocationMarkerIcon,
    MailIcon,
    PencilIcon,
    SearchIcon,
  } from '@heroicons/react/solid'

const MinifiedProduct = ({candidate}: {candidate: any}) => {
  return (
    <li key={candidate.email}>
    <a href="#" className="block group">
      <div className="flex items-center px-4 py-5 sm:py-6 sm:px-0">
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex-shrink-0">
            <img
              className="w-12 h-12 rounded-full group-hover:opacity-75"
              src={candidate.imageUrl}
              alt=""
            />
          </div>
          <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p className="text-sm font-medium text-purple-600 truncate">{candidate.name}</p>
              <p className="flex items-center mt-2 text-sm text-gray-500">
                <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="truncate">{candidate.email}</span>
              </p>
            </div>
            <div className="hidden md:block">
              <div>
                <p className="text-sm text-gray-900">
                  Applied on <time dateTime={candidate.appliedDatetime}>{candidate.applied}</time>
                </p>
                <p className="flex items-center mt-2 text-sm text-gray-500">
                  <CheckCircleIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                  {candidate.status}
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
    </a>
  </li>
  )
}

export default MinifiedProduct