import { Injectable } from '@angular/core';
import { ICategory, ICategoryResponse, IResponseModel } from '../interfaces/interface';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private readonly path = `${environment.dbPath}/categories`;
  private readonly pathSuffix = '.json';
  private readonly _popularCategories$: BehaviorSubject<ICategoryResponse[]> = new BehaviorSubject([] as ICategoryResponse[]);
  private readonly _categories$: BehaviorSubject<ICategoryResponse[]> = new BehaviorSubject([] as ICategoryResponse[]);

  constructor(private http: HttpService) { }

  get categories$(): Observable<ICategoryResponse[]> {
    return this._categories$.pipe(
      switchMap(data => {
        return !data.length ? this.getCategoriesFromApi() : this._categories$.asObservable();
      })
    )
  }

  private getCategoriesFromApi(): Observable<ICategoryResponse[]> {
    return this.http.get<IResponseModel<ICategory>>(`${this.path}${this.pathSuffix}`).pipe(
      map((data) =>
        Object.keys(data).map((key) => ({
          key,
          category: data[key],
        })),
      ),
      tap((data) => {
        this._categories$.next(data);
      })
    );
  }

  get popularCategories$(): Observable<ICategoryResponse[]> {
    return this._popularCategories$.pipe(
      switchMap((res) => {
        return !res.length ? this.getPopularCategoriesFromApi() : this._popularCategories$.asObservable();
      })
    )
  }

  private getPopularCategoriesFromApi(): Observable<ICategoryResponse[]> {
    return this.http
      .get<
        IResponseModel<ICategory>
      >(`${this.path}${this.pathSuffix}`, this.createQuery('isPopular', true))
      .pipe(
        map((data) =>
          Object.keys(data).map((key) => ({
            key,
            category: data[key],
          })),
        ),
        tap((data) => {
          this._popularCategories$.next(data);
        }),
      );
  }

  getCategory(categoryKey: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.path}/${categoryKey}${this.pathSuffix}`);
  }

  createCategory(category: ICategory): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(`${this.path + this.pathSuffix}`, category);
  }

  editCategory(categoryKey: string, category: ICategory): Observable<IResponseModel<ICategory>> {
    return this.http.patch<IResponseModel<ICategory>>(
      `${this.path}/${categoryKey}${this.pathSuffix}`,
      category,
    );
  }

  deleteCategory(categoryKey: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${categoryKey}${this.pathSuffix}`);
  }

  createQuery(field: string, value: string | boolean): HttpParams {
    const params = {
      orderBy: `"${field}"`,
      equalTo: typeof value === 'string' ? `"${value}"` : `${value}`,
    };
    return new HttpParams({ fromObject: params });
  }
}
