import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './shared/services';
import { LoaderService } from './shared/services/loader.service';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'rcp-root',
  standalone: true,
  imports: [LayoutComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();

  isLoading: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private renderer: Renderer2,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    this.authService.checkAuthState();

    this.loaderService.isLoading$.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(state => {
        state
          ? this.renderer.addClass(this.document.body, 'noscroll')
          : this.renderer.removeClass(this.document.body, 'noscroll');

        this.isLoading = state;
      })

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
