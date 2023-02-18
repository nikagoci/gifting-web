export interface ProductInterface {
  _id: string;
  name: string;
  city: string;
  imageSrc: string;
  description: string;
  category:
    | "All New Arrivals"
    | "Household Items"
    | "Electronics"
    | "Clothes"
    | "Other";
  gender: "male" | "female";
}

export interface productFilterContextInterface {
  categories: string[]
  genders: string[]
  conditions: string[]
  city: string;
}

export interface productFilterValueInterface extends productFilterContextInterface {
  changeCategories: (category: string) => void;
  changeCity: (city: string) => void;
  changeGenders: (gender: string) => void;
  changeConditions: (condition: string) => void;
  removeCategory: (value: string) => void;
  removeCondition: (value: string) => void;
  removeGender: (value: string) => void;
}

export interface addProductContextInterface {
    name: string;
    image: string;
    city: string;
    category: string;
    gender: string;
    description: string;
}

export interface addProductValueInterface extends addProductContextInterface {
  addName: (name: string) => void;
  addCategory: (category: string) => void;
  addGender: (gender: string) => void;
  addCity: (city: string) => void;
  addImage: (image: string) => void;
  addDescription: (description: string) => void;
}