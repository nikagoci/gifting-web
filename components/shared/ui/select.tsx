import {useStoreRehydrated} from 'easy-peasy'

interface Props {
  label: string;
  options: string[];
  defaultValue: string;
  id: string;
  register?: any;
  onChange: (id: string, value: string) => void;
}

export default function Select({label, options, defaultValue, id, register, onChange } : Props) {
  const isRehydrated = useStoreRehydrated();

    if(!isRehydrated) return <h1>Loading...</h1>;
    
  return (
    <div className="w-full">
      <legend className="block mb-3 text-sm font-medium text-gray-900">
        {label}
      </legend>
      <select
        id={id}
        name={id}
        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...register}
        value={defaultValue}
        onChange={(e) => onChange(id, e.target.value)}
      >
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
