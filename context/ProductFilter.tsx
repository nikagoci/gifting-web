import { productFilterContextInterface, productFilterValueInterface } from '@/utils/interfaces';
import React, {createContext, useReducer, ReactNode} from 'react';
import ProductFilterReducer from './ProductFilterReducer';

export const ProductFilterContext = createContext<productFilterValueInterface | null>(null);

const initialState: productFilterContextInterface = {
    categories: [],
    genders: [],
    conditions: [],
    city: ''
}

export const ProductFilterContextProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(ProductFilterReducer, initialState)

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

    const removeCategory = (value: string) => {
        dispatch({type: 'REMOVE_CATEGORY', payload: value})
    }

    const removeGender = (value: string) => {
        dispatch({type: 'REMOVE_GENDER', payload: value})
    }
    const removeCondition = (value: string) => {
        dispatch({type: 'REMOVE_CONDITION', payload: value})
    }

    const value: productFilterValueInterface = {
        categories: state.categories,
        genders: state.genders,
        conditions: state.conditions,
        city: state.city,
        changeCategories,
        changeConditions,
        changeGenders,
        changeCity,
        removeCategory,
        removeGender,
        removeCondition
    }

    return (
        <ProductFilterContext.Provider value={value}>
            {children}
        </ProductFilterContext.Provider>        
    )
}