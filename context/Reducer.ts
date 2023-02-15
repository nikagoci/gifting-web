import { productContextInterface } from "@/utils/interfaces";

const Reducer = (state: productContextInterface, action: any) => {
  switch (action.type) {
    case "CHANGE_CATEGORIES":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "CHANGE_GENDERS":
      return {
        ...state,
        genders: [...state.genders, action.payload],
      };
    case "CHANGE_CONDITIONS":
      return {
        ...state,
        conditions: [...state.conditions, action.payload],
      };

    case "CHANGE_CITY":
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
