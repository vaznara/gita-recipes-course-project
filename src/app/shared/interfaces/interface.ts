import { TemplateRef } from '@angular/core';

export interface IResponseModel<T> {
  [key: string]: T;
}

export interface ICategory {
  name: string;
  description: string;
  imgPath: string;
  author: string;
}

export interface IRecipe {
  author: string;
  isInMainCarousel: boolean;
  isFeatured: boolean;
  title: string;
  imgPath: string;
  categoryKey: string;
  shortDescription: string;
  servingCount: number;
  preparationTime: number;
  ingredientsBlock: IIngredientsBlock[];
  steps: string[];
}

export interface IRecipeResponse {
  key: string;
  recipe: IRecipe;
}

export interface ICategoryResponse {
  key: string;
  category: ICategory;
}

export interface IIngredientsBlock {
  ingredientsBlockTitle: string;
  ingredients: IIngredient[];
}

export interface IIngredient {
  name: string;
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
  password: string;
}

export interface IMenuItem {
  code: string;
  title: string;
  path: string;
}

export interface IDialogData {
  id: string;
  title?: {
    id: string;
    title: string;
  };
  hasCloseBtn: boolean;
  inputTemplateRef?: TemplateRef<unknown>;
  hasHtml?: boolean;
  bodyContent?: string;
  hasFooter?: boolean;
  buttons: IDialogDataButton[];
}

export interface IDialogDataButton {
  text: string;
  btnClasses: string[];
  isCloseBtn: boolean;
}

export interface IBreadcrumb {
  label: string;
  url: string;
}
