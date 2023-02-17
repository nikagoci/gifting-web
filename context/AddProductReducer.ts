import { addProductContextInterface } from "@/utils/interfaces";

const AddProductReducer = (state: addProductContextInterface, action: any) => {
  switch (action.type) {
    case "ADD_NAME":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default AddProductReducer;
