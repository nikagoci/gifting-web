export default function CheckboxList() {
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
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
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
                id="candidates"
                aria-describedby="candidates-description"
                name="candidates"
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
                id="offers"
                aria-describedby="offers-description"
                name="offers"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </fieldset>
    )
  }
  