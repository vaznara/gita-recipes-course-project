import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, User, UserCredential } from '@angular/fire/auth';
import { ISignInUser, ISignUpUser } from '../interfaces/interface';
import { BehaviorSubject, concatMap, from, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private _auth: Auth) {
    onAuthStateChanged(this._auth, (user) => {
      if (user) this._currentUser$.next(user);
    })
  }

  signUpUser(userData: ISignUpUser): Observable<User | null> {
    return from(createUserWithEmailAndPassword(this._auth, userData.email, userData.password))
      .pipe(
        concatMap(userCredential => {
          const user = { ...userCredential.user, displayName: userData.fullName };
          this._currentUser$.next(user);
          return from(updateProfile(userCredential.user, { displayName: userData.fullName }))
        }),
        concatMap(() => {
          return this.currentUser$
        })
      )
  }

  signInUser(userData: ISignInUser): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this._auth, userData.email, userData.password))
      .pipe(
        tap((userCredential) => {
          this._currentUser$.next(userCredential.user)
        })
      )
  }

  signOutUser(): Observable<void> {
    return from(this._auth.signOut());
  }

  get currentUser$(): Observable<User | null> {
    return this._currentUser$.asObservable();
  }
}
