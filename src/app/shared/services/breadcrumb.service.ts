import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, BehaviorSubject, Observable } from 'rxjs';
import { IBreadcrumb } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private _breadcrumbs$: BehaviorSubject<IBreadcrumb[]> = new BehaviorSubject([] as IBreadcrumb[]);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this._breadcrumbs$.next(this.buildPath(this.activatedRoute.root));
    });
  }

  private buildPath(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url });
      return this.buildPath(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  get breadcrumbs$(): Observable<IBreadcrumb[]> {
    return this._breadcrumbs$.asObservable();
  }
}
