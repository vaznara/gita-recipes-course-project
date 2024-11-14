import { Injectable } from '@angular/core';
import { ICategory, ICategoryResponse, IResponseModel } from '../interfaces/interface';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly path = `${environment.dbPath}/categories`;
  private readonly pathSuffix = '.json'

  constructor(private http: HttpService) { }

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

  getPopularCategories(): Observable<ICategoryResponse[]> {
    return this.http.get<IResponseModel<ICategory>>(`${this.path}${this.pathSuffix}`,
      this.createQuery('isPopular', true)
    ).pipe(
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

  createCategory(category: ICategory): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(`${this.path + this.pathSuffix}`, category)
  }

  editCategory(categoryKey: string, category: ICategory): Observable<IResponseModel<ICategory>> {
    return this.http.patch<IResponseModel<ICategory>>(`${this.path}/${categoryKey}${this.pathSuffix}`, category)
  }

  deleteCategory(categoryKey: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${categoryKey}${this.pathSuffix}`);
  }

  createQuery(field: string, value: string | boolean): HttpParams {
    const params = { 'orderBy': `"${field}"`, 'equalTo': typeof value === 'string' ? `"${value}"` : `${value}` };
    return new HttpParams({ fromObject: params });
  }
}
