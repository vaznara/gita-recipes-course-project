import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../shared/services';
import { concatMap, Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { IDialogData } from '../../shared/interfaces/interface';
import { ApiErrorHandlerService } from '../../shared/services/api-error-handler.service';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rcp-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();
  user: User | null = null;

  @ViewChild('passwordChangeRef') passwordChangeRef?: TemplateRef<HTMLFormElement>;

  userProfileForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required]),
  })

  passwordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  isUpdated: boolean = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private title: Title,
    private errorHandler: ApiErrorHandlerService
  ) { }


  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        this.user = res;
        if (res?.displayName) this.fullName?.setValue(res.displayName);
        if (res?.email) this.email?.setValue(res.email);
        this.title.setTitle(`${this.user?.displayName}'s profile`)
      });
  }

  get fullName(): AbstractControl | null {
    return this.userProfileForm.get('fullName');
  }

  get email(): AbstractControl | null {
    return this.userProfileForm.get('email');
  }

  onFullNameUpdate(): void {
    if (this.fullName?.touched && this.fullName.valid) {
      this.authService.updateUserProfile(this.fullName.value).pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => this.isUpdated = true)
    }
  }

  onLogout(): void {
    this.authService.signOutUser().pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe()
  }

  onDelete(): void {
    const dialogData: IDialogData = {
      id: 'accountDeleteConfirmationModal',
      title: {
        id: 'accountDeleteConfirmationModalTitle',
        title: 'Are you sure you want to delete your account?'
      },
      hasCloseBtn: true,
      bodyContent: 'These action is irreversible',
      hasFooter: true,
      buttons: [
        {
          isCloseBtn: true,
          btnClasses: ['btn', 'btn-secondary'],
          text: 'Cancel'
        },
        {
          isCloseBtn: false,
          btnClasses: ['btn', 'btn-danger', 'text-white'],
          text: 'Confirm'
        }
      ]
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData
    });

    dialogRef.componentInstance.confirm.pipe(
      takeUntil(this.ngUnsubscribe$),
      concatMap(() => {
        dialogRef.close();
        return this.authService.deleteUser()
      }),
    ).subscribe();
  }

  onPasswordChange(): void {
    const dialogData: IDialogData = {
      id: 'passwordChangeModal',
      title: {
        id: 'passwordChangeModalTitle',
        title: 'Renew password'
      },
      hasCloseBtn: true,
      inputTemplateRef: this.passwordChangeRef,
      hasFooter: true,
      buttons: [
        {
          isCloseBtn: true,
          btnClasses: ['btn', 'btn-secondary'],
          text: 'Cancel'
        },
        {
          isCloseBtn: false,
          btnClasses: ['btn', 'btn-danger', 'text-white'],
          text: 'Confirm'
        }
      ]
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData
    });

    this.passwordForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(value => {
        if (value.newPassword !== value.confirmPassword) {
          this.passwordForm.setErrors({ notMatch: 'Passwords do not match' });
        }
      })

    dialogRef.componentInstance.confirm.pipe(
      takeUntil(this.ngUnsubscribe$),
      concatMap(() => {
        if (this.passwordForm.hasError('notMatch')) {
          return this.errorHandler.handleError({
            name: 'Error!',
            message: 'Passwords do not match. try again!'
          })
        }
        dialogRef.close();
        const newPassword = this.passwordForm.get('newPassword')?.value;
        return this.authService.updateUserPassword(newPassword);
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


}
