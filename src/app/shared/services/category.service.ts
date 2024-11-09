import { Injectable } from '@angular/core';
import { ICategory, ICategoryResponse, IResponseModel } from '../interfaces/interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENV_VARIABLES } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly path = `${ENV_VARIABLES.dbPath}/categories`;
  private readonly pathSuffix = '.json'

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategoryResponse[]> {
    return this.http.get<IResponseModel<ICategory>>(`${this.path}${this.pathSuffix}`).pipe(
      map((data) =>
        Object.keys(data).map(key => ({
          key,
          category: data[key]
        }))
      )
    );
  }

  getCategory(categoryKey: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.path}/${categoryKey}${this.pathSuffix}`)
  }

  createCategory(categoryKey: string, category: ICategory): Observable<IResponseModel<ICategory>> {
    return this.http.post<IResponseModel<ICategory>>(`${this.path}/${categoryKey}${this.pathSuffix}`, category)
  }

  editCategory(categoryKey: string, category: ICategory): Observable<IResponseModel<ICategory>> {
    return this.http.patch<IResponseModel<ICategory>>(`${this.path}/${categoryKey}${this.pathSuffix}`, category)
  }

  deleteCategory(categoryKey: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${categoryKey}${this.pathSuffix}`);
  }
}
