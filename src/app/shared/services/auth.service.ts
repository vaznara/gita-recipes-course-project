import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  Unsubscribe,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { ISignInUser, ISignUpUser } from '../interfaces/interface';
import { catchError, concatMap, from, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private _currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private _currentUser$: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);

  constructor(
    private _auth: Auth,
    private apiErrorHandler: ApiErrorHandlerService,
    private location: Location,
    private loaderService: LoaderService,
  ) {}

  signUpUser(userData: ISignUpUser): Observable<User | null> {
    this.loaderService.isLoading$.next(true);
    return from(createUserWithEmailAndPassword(this._auth, userData.email, userData.password)).pipe(
      concatMap((userCredential) => {
        const user = { ...userCredential.user, displayName: userData.fullName };
        this._currentUser$.next(user);
        return from(updateProfile(userCredential.user, { displayName: userData.fullName }));
      }),
      concatMap(() => {
        window.location.reload();
        this.loaderService.isLoading$.next(false);
        return this.currentUser$;
      }),
      catchError((err) => {
        this.loaderService.isLoading$.next(false);
        return this.apiErrorHandler.handleError(err);
      }),
    );
  }

  signInUser(userData: ISignInUser): Observable<UserCredential> {
    this.loaderService.isLoading$.next(true);
    return from(signInWithEmailAndPassword(this._auth, userData.email, userData.password)).pipe(
      catchError((err) => {
        this.loaderService.isLoading$.next(false);
        return this.apiErrorHandler.handleError(err);
      }),
      tap((userCredential) => {
        this.loaderService.isLoading$.next(false);
        this._currentUser$.next(userCredential.user);
      }),
    );
  }

  signOutUser(): Observable<void> {
    this.loaderService.isLoading$.next(true);
    return from(this._auth.signOut()).pipe(
      catchError((err) => {
        this.loaderService.isLoading$.next(false);
        return this.apiErrorHandler.handleError(err);
      }),
      tap(() => {
        window.location.reload();
        this._currentUser$.next(null);
        this.loaderService.isLoading$.next(false);
      }),
    );
  }

  deleteUser(): Observable<void> {
    this.loaderService.isLoading$.next(true);
    const user = this._auth.currentUser;
    if (!user) {
      return throwError(() => 'Not Authroized');
    }
    return from(deleteUser(user)).pipe(
      concatMap(() => this.signOutUser()),
      catchError((err) => {
        this.loaderService.isLoading$.next(false);
        return this.apiErrorHandler.handleError(err);
      }),
      tap(() => {
        window.location.reload();
        this._currentUser$.next(null);
        this.loaderService.isLoading$.next(false);
      }),
    );
  }

  updateUserPassword(password: string): Observable<void> {
    this.loaderService.isLoading$.next(true);
    const user = this._auth.currentUser;
    if (!user) {
      return throwError(() => 'Not Authroized');
    }
    return from(updatePassword(user, password)).pipe(
      tap(() => {
        this.loaderService.isLoading$.next(false);
      }),
      catchError((err) => {
        this.loaderService.isLoading$.next(false);
        return this.apiErrorHandler.handleError(err);
      }),
    );
  }

  updateUserProfile(displayName?: string, photoURL?: string): Observable<void> {
    this.loaderService.isLoading$.next(true);
    return this.currentUser$.pipe(
      catchError((err) => {
        this.loaderService.isLoading$.next(false);
        return throwError(() => err);
      }),
      concatMap((user) => {
        this.loaderService.isLoading$.next(false);
        if (user) {
          return updateProfile(user, { displayName, photoURL });
        }
        return throwError(() => 'User not authorized');
      }),
    );
  }

  checkAuthState(): Unsubscribe {
    this.loaderService.isLoading$.next(true);
    return onAuthStateChanged(this._auth, (user) => {
      this._currentUser$.next(user);
      this.loaderService.isLoading$.next(false);
    });
  }

  get currentUser$(): Observable<User | null> {
    return this._currentUser$.asObservable();
  }
}
