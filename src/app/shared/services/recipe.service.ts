import { Injectable } from '@angular/core';
import { IRecipe, IResponseModel } from '../interfaces/interface';
import { map, Observable } from 'rxjs';
import { ENV_VARIABLES } from '../../../environments/environment.dev';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesDummyData: IRecipe[] = []

  private readonly path = `${ENV_VARIABLES.dbPath}/recipes`
  private readonly pathSuffix = `.json`

  constructor(private http: HttpClient) { }

  getRecipesByCategory(categoryKey: string): Observable<{ key: string, recipe: IRecipe }[]> {
    return this.http.get<IResponseModel<IRecipe>>(`${this.path + this.pathSuffix}`, { params: this.createQuery('categoryKey', categoryKey) }).pipe(
      map((data) =>
        Object.keys(data).map(key => ({
          key,
          recipe: data[key]
        }))
      )
    )
  }

  getRecipes(): Observable<{ key: string, recipe: IRecipe }[]> {
    return this.http.get<IResponseModel<IRecipe>>(`${this.path + this.pathSuffix}`).pipe(
      map((data) =>
        Object.keys(data).map(key => ({
          key,
          recipe: data[key]
        }))
      )
    );
  }

  getUserRecipes(userId: string): Observable<{ key: string, recipe: IRecipe }[]> {
    return this.http.get<IResponseModel<IRecipe>>(
      `${this.path + this.pathSuffix}`,
      { params: this.createQuery('author', userId) }
    ).pipe(
      map((data) =>
        Object.keys(data).map(key => ({
          key,
          recipe: data[key]
        }))
      )
    );
  }

  getRecipe(key: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${this.path}/${key}${this.pathSuffix}`);
  }

  createRecipe(recipe: IRecipe): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(`${this.path + this.pathSuffix}`, recipe);
  }

  deleteRecipe(recipeKey: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${recipeKey}${this.pathSuffix}`);
  }

  editRecipe(recipeKey: string, recipe: IRecipe): Observable<void> {
    return this.http.patch<void>(`${this.path}/${recipeKey}${this.pathSuffix}`, recipe);
  }

  createQuery(field: string, value: string): HttpParams {
    const params = { 'orderBy': `"${field}"`, 'equalTo': `"${value}"` };
    return new HttpParams({ fromObject: params });
  }
}
