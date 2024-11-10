import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { IBreadcrumb } from '../../interfaces/interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'rcp-breadcrumb',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$: Subject<void> = new Subject();

  breadcrumbs: IBreadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        console.log(res)
        this.breadcrumbs = res
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
