import { addProductContextInterface } from "@/utils/interfaces";

const AddProductReducer = (state: addProductContextInterface, action: any) => {
  switch (action.type) {
    case "ADD_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ADD_IMAGE":
      return {
        ...state,
        image: action.payload,
      };
    case "ADD_GENDER":
      return {
        ...state,
        gender: action.payload,
      };

    case "ADD_CITY":
      return {
        ...state,
        city: action.payload,
      };

    case "ADD_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default AddProductReducer;
