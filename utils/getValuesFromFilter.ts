export const getValuesFromFilter = (filters: { id: string; value: string }[]): {strCategories: string, strGenders:string} => {
    const categories = filters.filter(filter => filter.id === 'category').map(category => category.value);
    const genders = filters.filter(filter => filter.id === 'gender').map(gender => gender.value)

    const strCategories = categories.join('.')
    const strGenders = genders.join('.')
    
    return {strCategories, strGenders}
  }