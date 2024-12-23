import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterEvent, RouterLink, Event } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { UserControlComponent } from './components/user-control/user-control.component';
import { AuthService } from '../../../shared/services';
import { filter, Subject, takeUntil } from 'rxjs';
import { User } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginModalComponent } from '../../../pages/login/components/login-modal/login-modal.component';
import { IMenuItem } from '../../../shared/interfaces/interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'rcp-header',
  standalone: true,
  imports: [RouterLink, MainMenuComponent, UserControlComponent, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  ngUnsubscribe$: Subject<void> = new Subject();
  user: User | null = null;
  userMenu: IMenuItem[] = [
    { code: 'profile', path: 'my-profile', title: 'My Profile' },
    { code: 'recipes', path: 'my-recipes', title: 'My Recipes' },
    { code: 'createRecipe', path: 'recipe/new', title: 'Create recipe' },
  ];

  private dialogRef?: MatDialogRef<LoginModalComponent>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((user) => {
      this.user = user;
    });

    this.router.events
      .pipe(
        filter((event: Event | RouterEvent) => event instanceof NavigationStart),
        filter(() => !!this.dialogRef),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(() => {
        this.dialogRef?.close();
      });
  }

  onLogin(): void {
    this.dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px',
    });
  }

  onLogout(): void {
    this.authService.signOutUser().pipe(takeUntil(this.ngUnsubscribe$)).subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
