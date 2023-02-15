import { productContextInterface, productValueInterface } from '@/utils/interfaces';
import React, {createContext, useReducer, ReactNode} from 'react';
import Reducer from './Reducer';

export const ProductContext = createContext<productValueInterface | null>(null);

const initialState: productContextInterface = {
    categories: [],
    genders: [],
    conditions: [],
    city: ''
}



export const ProductContextProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    const changeCategories = (category: string) => {
        dispatch({type: 'CHANGE_CATEGORIES', payload: category})
    }

    const changeGenders = (gender: string) => {
        dispatch({type: 'CHANGE_GENDERS', payload: gender})
    }

    const changeConditions = (condition:string) => {
        dispatch({type: 'CHANGE_CONDITIONS', payload: condition})
    }

    const changeCity = (city: string) => {
        dispatch({type: 'CHANGE_CITY', payload: city})
    }

    const value: productValueInterface = {
        categories: state.categories,
        genders: state.genders,
        conditions: state.conditions,
        city: state.city,
        changeCategories,
        changeConditions,
        changeGenders,
        changeCity
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>        
    )
}