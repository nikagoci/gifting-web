import { Dispatch, SetStateAction } from "react";

interface Props {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>
}

export default function CheckboxList({checked, setChecked}: Props) {

    return (
      <fieldset className="border-t border-b border-gray-200">
        <legend className="sr-only">Notifications</legend>
        <div className="divide-y divide-gray-200">
          <div className="relative flex items-start py-4">
            <div className="flex-1 min-w-0 text-sm">
              <label htmlFor="comments" className="font-medium text-gray-700">
                Phone Number
              </label>
              <p id="comments-description" className="text-gray-500">
                After posting product your phone number will become public.
              </p>
            </div>
            <div className="flex items-center h-5 ml-3">
              <input
                id="phone"
                aria-describedby="phone-number"
                name="phone"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                checked={checked}
                onChange={() => setChecked(prev => !prev)}
              />
            </div>
          </div>
          <div className="relative flex items-start py-4">
            <div className="flex-1 min-w-0 text-sm">
              <label htmlFor="candidates" className="font-medium text-gray-700">
                Email notification
              </label>
              <p id="candidates-description" className="text-gray-500">
                Get notified if user will interest with your product.
              </p>
            </div>
            <div className="flex items-center h-5 ml-3">
              <input
                id="email"
                aria-describedby="email-notification"
                name="email"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="relative flex items-start py-4">
            <div className="flex-1 min-w-0 text-sm">
              <label htmlFor="offers" className="font-medium text-gray-700">
                Newsletter
              </label>
              <p id="offers-description" className="text-gray-500">
                Get notified to any news within seconds.
              </p>
            </div>
            <div className="flex items-center h-5 ml-3">
              <input
                id="news"
                aria-describedby="news-letter"
                name="news"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </fieldset>
    )
  }
  