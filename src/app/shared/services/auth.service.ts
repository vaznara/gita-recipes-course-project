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
import { ISignInUser, ISignUpUser, IUserProfile } from '../interfaces/interface';
import { catchError, concatMap, from, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly userApiUrl = `${environment.dbPath}/users`;
  private readonly pathSuffix = `.json`;

  private _currentUser$: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);
  private _newUser: User | null = null;

  constructor(
    private _auth: Auth,
    private apiErrorHandler: ApiErrorHandlerService,
    private http: HttpService,
    private loaderService: LoaderService,
  ) { }

  signUpUser(userData: ISignUpUser): Observable<User | null> {
    this.loaderService.isLoading$.next(true);
    return from(createUserWithEmailAndPassword(this._auth, userData.email, userData.password)).pipe(
      concatMap((userCredential) => {
        return from(updateProfile(userCredential.user, { displayName: userData.fullName }));
      }),
      concatMap(() => {
        this._newUser = this._auth.currentUser;
        this._currentUser$.next(this._auth.currentUser);
        const uid = this._newUser?.uid ?? '';
        return this.http.patch<IUserProfile>(`${this.userApiUrl}/${uid + this.pathSuffix}`, {
          displayName: this._newUser?.displayName,
          photoUrl: this._newUser?.photoURL
        })
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
      concatMap(() => {
        return this.http.delete<void>(`${this.userApiUrl}/${this._auth.currentUser?.uid}`)
      }),
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

  updateUserProfile(displayName?: string, photoUrl?: string): Observable<void> {
    this.loaderService.isLoading$.next(true);
    return this.currentUser$.pipe(
      concatMap((user) => {
        this.loaderService.isLoading$.next(false);
        if (user) {
          return from(updateProfile(user, { displayName, photoURL: photoUrl }))
            .pipe(concatMap(() => this.http.patch<void>(`${this.userApiUrl}/${user.uid + this.pathSuffix}`, { displayName, photoUrl })));
        }
        return throwError(() => 'User not authorized');
      }),
      catchError((err) => {
        this.loaderService.isLoading$.next(false);
        return throwError(() => err);
      })
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
