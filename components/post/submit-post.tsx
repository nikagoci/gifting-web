import CheckboxList from "./checkbox-list";

export default function SubmitPost() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-center">Submit your product</h3>
      <div className="flex flex-col items-center py-16">
        <h3 className="text-lg">Please read below conditions <span className="font-bold underline">CAREFULLY</span></h3>
        <div className="py-12">
            <CheckboxList />

        </div>
        <button
          className="inline-flex items-center px-16 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
