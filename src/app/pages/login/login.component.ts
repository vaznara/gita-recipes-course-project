import { Component, OnDestroy } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ISignInUser } from '../../shared/interfaces/interface';
import { AuthService } from '../../shared/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'rcp-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();

  constructor(private authService: AuthService) { }

  onLogin(userData: ISignInUser): void {
    this.authService.signInUser(userData).pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe()
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
