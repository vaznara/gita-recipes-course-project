import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../services';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[rcpUserAccess]',
  standalone: true
})
export class UserAccessDirective implements AfterViewInit, OnDestroy {

  private readonly ngUnsubscribe$: Subject<void> = new Subject();

  @Input('rcpUserAccess') contentOwnerUid?: string;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService
  ) { }

  ngAfterViewInit(): void {
    this.authService.currentUser$.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(user => {
        if (!this.contentOwnerUid || user?.uid !== this.contentOwnerUid) {
          this.elementRef.nativeElement.remove();
        }
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
