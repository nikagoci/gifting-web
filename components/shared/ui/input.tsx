interface Props {
  id: string;
  label: string;
  type: string;
  register: any;
  errors: any
}

export default function Input(props: Props) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <div className="mt-1">
        <input
          id={props.id}
          name={props.id}
          type={props.type}
          className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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


//example of input
{/* <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div> */}