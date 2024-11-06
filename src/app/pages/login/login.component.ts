import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ISignInUser } from '../../shared/interfaces/interface';
import { AuthService } from '../../shared/services';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rcp-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();
  sourcePath: string | null = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const sourceParam = this.route.snapshot.queryParamMap.get('source');
    if (sourceParam) {
      this.sourcePath = atob(sourceParam);
    }
    // this.authService.signOutUser().subscribe(() => console.log('sign out'));
  }

  onLogin(userData: ISignInUser): void {
    this.authService.signInUser(userData).pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.router.navigate([this.sourcePath])
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
