import { Component, OnDestroy } from '@angular/core';
import { SignupFormComponent } from './components/singup-form/signup-form.component';
import { AuthService } from '../../shared/services';
import { ISignUpUser } from '../../shared/interfaces/interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'rcp-signup',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();

  constructor(private authService: AuthService) { }

  onCreate(user: ISignUpUser): void {
    this.authService.signUpUser(user).pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe()
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
