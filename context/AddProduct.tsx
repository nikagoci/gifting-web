import { addProductContextInterface, addProductValueInterface } from "@/utils/interfaces";
import { createContext, useReducer, ReactNode  } from "react";
import AddProductReducer from "./AddProductReducer";

export const AddProductContext = createContext<addProductContextInterface | null>(null);

const initialState: addProductContextInterface = {
    name: '',
    image: '',
    city: '',
    category: '',
    gender: ''
}


export const AddProductContextProvider = ({children}: {children: ReactNode}) => {
    const [state,dispatch] = useReducer(AddProductReducer, initialState)

    const value: addProductValueInterface = {
            name: state.name,
            image: state.image,
            city: state.city,
            category: state.category,
            gender: state.gender
    }
    return (
        <AddProductContext.Provider value={value}>
            {children}
        </AddProductContext.Provider>
    )
}