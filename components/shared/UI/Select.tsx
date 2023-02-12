/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Select() {
  return (
    <>
      <legend className="block mb-3 text-sm font-medium text-gray-900">
        City
      </legend>
      <select
        id="city"
        name="city"
        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        defaultValue="Canada"
      >
        <option>USA</option>
        <option>Canada</option>
        <option>EU</option>
      </select>
    </>
  );
}
