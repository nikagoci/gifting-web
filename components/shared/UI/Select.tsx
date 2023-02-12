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

interface Props {
  label: string;
  options: string[];
  defaultValue: string;
  id: string;
}

export default function Select({label, options, defaultValue, id } : Props) {
  return (
    <div className="w-full">
      <legend className="block mb-3 text-sm font-medium text-gray-900">
        {label}
      </legend>
      <select
        id={id}
        name={id}
        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        defaultValue={defaultValue}
      >
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
