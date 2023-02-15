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
  gender: "Male" | "Female";
  condition: "Used" | "Normal";
}

export interface productContextInterface {
  categories: string[]
  genders: string[]
  conditions: string[]
  city: string;
}

export interface productValueInterface extends productContextInterface {
  changeCategories: (category: string) => void;
  changeCity: (city: string) => void;
  changeGenders: (gender: string) => void;
  changeConditions: (condition: string) => void;
  removeCategory: (value: string) => void;
  removeCondition: (value: string) => void;
  removeGender: (value: string) => void;
}
