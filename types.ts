
export interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  preparationMethod: string;
  preparationTime: number; // in minutes
  imageUrl: string;
}
