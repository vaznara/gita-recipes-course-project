import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'rcp-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BreadcrumbComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$: Subject<void> = new Subject();

  shouldShowBreadcrumb: boolean = true;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      this.shouldShowBreadcrumb = res.size !== 1;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
