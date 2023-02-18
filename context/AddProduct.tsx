import {
  addProductContextInterface,
  addProductValueInterface,
} from "@/utils/interfaces";
import { createContext, useReducer, ReactNode } from "react";
import AddProductReducer from "./AddProductReducer";

export const AddProductContext =
  createContext<addProductValueInterface | null>(null);

const initialState: addProductContextInterface = {
  name: "",
  image: "",
  city: "",
  category: "",
  gender: "",
  description: ''
};

export const AddProductContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(AddProductReducer, initialState);

  const addName = (name: string) => {
    dispatch({ type: "ADD_NAME", payload: name });
  };

  const addImage = (image: string) => {
    dispatch({ type: "ADD_IMAGE", payload: image });
  };

  const addCity = (city: string) => {
    dispatch({ type: "ADD_CITY", payload: city });
  };

  const addCategory = (category: string) => {
    dispatch({ type: "ADD_CATEGORY", payload: category });
  };

  const addGender = (gender: string) => {
    dispatch({ type: "ADD_GENDER", payload: gender });
  };

  const addDescription = (description: string) => {
    dispatch({ type: "ADD_DESCRIPTION", payload: description });
  }

  const value: addProductValueInterface = {
    name: state.name,
    image: state.image,
    city: state.city,
    category: state.category,
    gender: state.gender,
    description: state.description,
    addName,
    addCategory,
    addGender,
    addCity,
    addImage,
    addDescription
  };
  return (
    <AddProductContext.Provider value={value}>
      {children}
    </AddProductContext.Provider>
  );
};
