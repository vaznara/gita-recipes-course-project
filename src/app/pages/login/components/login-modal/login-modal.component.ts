import { Component, OnDestroy } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { ISignInUser } from '../../../../shared/interfaces/interface';
import { AuthService } from '../../../../shared/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'rcp-login-modal',
  standalone: true,
  imports: [LoginFormComponent, MatDialogClose],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent implements OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService
  ) { }

  onLogin(userData: ISignInUser): void {
    this.authService.signInUser(userData).pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe()
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
