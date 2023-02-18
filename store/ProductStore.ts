import { createStore, action, Action, persist } from "easy-peasy";

export interface Products {
    name: string;
    image: string;
    city: string;
    category: string;
    gender: string;
    description: string;
}

interface ProductModel {
    products: Products
}

type Name = string;
type Image = string;
type City = string;
type Category = string;
type Gender = string;
type Description = string;

export interface StoreModel {
    products: Products;
    addName: Action<ProductModel, Name>;
    addImage: Action<ProductModel, Image>;
    addCity: Action<ProductModel, City>;
    addCategory: Action<ProductModel, Category>;
    addGender: Action<ProductModel, Gender>;
    addDescription: Action<ProductModel, Description>;
    clearProducts: Action<ProductModel>
}

export const productStore = createStore<StoreModel>({
  products: persist({
    name: "",
    image: "",
    city: "Tbilisi",
    category: "All New Arrivals",
    gender: "",
    description: ""
  }),
  addName: action((state, payload) => {
    state.products.name = payload;
  }),
  addImage: action((state, payload) => {
    state.products.image = payload
  }),
  addCity: action((state, payload) => {
    state.products.city = payload
  }),
  addCategory: action((state, payload) => {
    state.products.category = payload
  }),
  addGender: action((state, payload) => {
    state.products.gender = payload;
  }),
  addDescription: action((state, payload) => {
    state.products.description = payload
  }),
  clearProducts: action((state) => {
    state.products = {
      name: "",
      image: "",
      city: "Tbilisi",
      category: "All New Arrivals",
      gender: "",
      description: ""
    }
  })
});
