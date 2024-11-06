import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginModalComponent } from '../../../../../pages/login/components/login-modal/login-modal.component';
import { NavigationStart, Router, RouterEvent, Event } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'rcp-user-control',
  standalone: true,
  imports: [],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.scss',
})
export class UserControlComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$: Subject<void> = new Subject();
  private dialogRef?: MatDialogRef<LoginModalComponent>;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event | RouterEvent) => event instanceof NavigationStart),
      filter(() => !!this.dialogRef),
      takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.dialogRef?.close();
      })
  }

  onLogin(): void {
    this.dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px',
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
