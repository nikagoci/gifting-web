import {useStoreRehydrated} from 'easy-peasy'
import Spinner from './spinner';

interface Props {
    id: string;
    label: string;
    register: any;
    errors: any;
    value?: string;
    onChange: (id: string, value: string) => void
  }
  
  export default function Textarea(props: Props) {
    const isRehydrated = useStoreRehydrated();

    if(!isRehydrated) return <Spinner size={40} />;

    return (
      <div>
        <label
          htmlFor={props.id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}
        </label>
        <div className="mt-1">
          <textarea
            id={props.id}
            name={props.id}
            rows="4"
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...props.register}
            defaultValue={props.value}
            onChange={(e) => props.onChange(props.id , e.target.value)}
          />
          
        </div>
        {
          props.errors?.message && (
            <p className="mt-2 text-sm font-semibold text-rose-600">{props.errors.message}!</p>
          )
        }
      </div>
    );
  }
  
  