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
    case "REMOVE_CATEGORY" :
      return {
        ...state,
        categories: state.categories.filter(category => category !== action.payload)
      }
    case "REMOVE_CONDITION" :
      return {
        ...state,
        conditions: state.conditions.filter(condition => condition !== action.payload)
      }
    case "REMOVE_GENDER" :
      return {
        ...state,
        genders: state.genders.filter(gender => gender !== action.payload)
      }
    default:
      return state;
  }
};

export default Reducer;
