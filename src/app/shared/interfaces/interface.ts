export interface ICategory {
  id: number;
  name: string;
  description: string;
  img: string;
}

export interface IRecipe {
  id: number | null;
  title: string;
  imgPath: string | null;
  idCategory: number;
  //TODO: make mandatory after backend
  shortDescription?: string;
  servingCount?: number;
  ingredientsBlock?: IIngredientsBlock[];
  steps?: string[];
}

export interface IIngredientsBlock {
  ingredientsBlockTitle: string;
  ingredients: IIngredient[];
}

export interface IIngredient {
  id: number;
  title: string;
  unit: string;
  quantity: number;
}

export interface ISignUpUser {
  fullName: string;
  email: string;
  password: string;
}

export interface ISignInUser {
  email: string;
  password: string
}
