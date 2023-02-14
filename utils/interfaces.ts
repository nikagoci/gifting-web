export interface ProductInterface {
      _id: string;
      name: string;
      city: string;
      imageSrc: string;
      description: string;
      category: 'All New Arrivals' | 'Household Items' | 'Electronics' | 'Clothes' | 'Other';
      gender: 'Male' | 'Female';
      condition: 'Used' | 'Normal';
  }