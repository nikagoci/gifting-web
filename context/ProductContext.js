import React, {createContext, useReducer, ReactNode} from 'react';
import Reducer from './Reducer';

export const ProductContext = createContext();

const initialState = {
    category: [],
    gender: [],
    condition: [],
    city: ''
}

export const ProductContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    const value = {
        category: state.category,
        gender: state.gender,
        condition: state.condition,
        city: state.city,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>        
    )
}