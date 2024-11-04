import { Injectable } from '@angular/core';
import { IRecipe } from '../interfaces/interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesDummyData: IRecipe[] = [
    { id: 1, idCategory: 1, title: "Decadent Raspberry and Cream Cake ", imgPath: "https://picsum.photos/300/200" },
    { id: 2, idCategory: 1, title: "Tripple Chocolate Mousse Cake ", imgPath: "https://picsum.photos/300/200" },
    { id: 3, idCategory: 1, title: "Cranberry Curd Layered Sponge Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 4, idCategory: 1, title: "Orange and Lemon Curd Tartlets", imgPath: "https://picsum.photos/300/200" },
    { id: 5, idCategory: 1, title: "Creamt Chocolate Nutella Fudge Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 6, idCategory: 2, title: "Homemade Mixed Berries Wedding Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 7, idCategory: 2, title: "Black Forest Birthday Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 8, idCategory: 2, title: "Double Thick Layered Sponge Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 9, idCategory: 2, title: "Lemon Cake with Chocolate Ganache", imgPath: "https://picsum.photos/300/200" },
    { id: 10, idCategory: 2, title: "Cranberry Macaroon Ice Cream Cake  ", imgPath: "https://picsum.photos/300/200" },
    { id: 11, idCategory: 3, title: "No Bake Cheesecake", imgPath: "https://picsum.photos/300/200" },
    { id: 12, idCategory: 3, title: "Almond Cinnamon Sponge Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 13, idCategory: 3, title: "Mixed Candy Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 14, idCategory: 3, title: "Cherry Ice Cream Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 15, idCategory: 3, title: "Four Layer Coffee Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 16, idCategory: 4, title: "Oreo Brownie Ice Cream Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 17, idCategory: 4, title: "Caramel Glaze Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 18, idCategory: 4, title: "No Bake Cinnamon Cheesecake", imgPath: "https://picsum.photos/300/200" },
    { id: 19, idCategory: 4, title: "Apple Cinnamon Bundt Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 20, idCategory: 4, title: "Rainbow Explosion Birthday Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 21, idCategory: 5, title: "Chocolate Peanut Butter Mini Cupcakes", imgPath: "https://picsum.photos/300/200" },
    { id: 22, idCategory: 5, title: "M&M’s Chocolate Cake", imgPath: "https://picsum.photos/300/200" },
    { id: 23, idCategory: 5, title: "Strawberry Cream Cake Bites", imgPath: "https://picsum.photos/300/200" },
    { id: 24, idCategory: 5, title: "Tiramisu Cheescake", imgPath: "https://picsum.photos/300/200" },
    { id: 25, idCategory: 5, title: "Load More", imgPath: "https://picsum.photos/300/200" }
  ]

  constructor() { }

  getRecipesByCategoryId(idCategory: number): Observable<IRecipe[] | undefined> {
    return of(this.recipesDummyData.filter(item => item.idCategory === idCategory))
  }

  getRecipeById(id: number): Observable<IRecipe | undefined> {
    return of(this.recipesDummyData.find(item => item.id === id))
  }
}
