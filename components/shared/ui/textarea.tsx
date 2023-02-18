interface Props {
    id: string;
    label: string;
    register: any;
    errors: any
  }
  
  export default function Textarea(props: Props) {
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
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            {...props.register}
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
  
  