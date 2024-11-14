import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../shared/services';
import { concatMap, Subject, takeUntil } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { IDialogData } from '../../shared/interfaces/interface';
import { ApiErrorHandlerService } from '../../shared/services/api-error-handler.service';
import { NgClass, NgStyle } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'rcp-my-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent implements OnInit, OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();
  user: User | null = null;

  @ViewChild('passwordChangeRef') passwordChangeRef?: TemplateRef<HTMLFormElement>;

  userProfileForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  passwordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  isUpdated: boolean = false;

  imageFile?: File;
  imagePathControl: FormControl = new FormControl('');

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private title: Title,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService,
    private errorHandler: ApiErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      this.user = res;
      if (res?.displayName) this.fullName?.setValue(res.displayName);
      if (res?.email) this.email?.setValue(res.email);
      if (res?.photoURL) this.imagePathControl.setValue(res.photoURL);
      this.title.setTitle(`${this.user?.displayName}'s profile`);
    });
  }

  get fullName(): AbstractControl | null {
    return this.userProfileForm.get('fullName');
  }

  get email(): AbstractControl | null {
    return this.userProfileForm.get('email');
  }

  onUpdate(): void {
    const fullName = this.fullName?.touched && this.fullName.valid ? this.fullName?.value : undefined;

    if (this.imageFile) {
      this.storageService.uploadImage(this.imageFile)
        .pipe(
          concatMap((imagePath) => {
            this.imagePathControl.setValue(imagePath);
            return this.authService
              .updateUserProfile(fullName, imagePath)
          }),
          takeUntil(this.ngUnsubscribe$)
        ).subscribe(() => this.isUpdated = true);
      return;
    }


    this.authService
      .updateUserProfile(fullName)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.isUpdated = true);
  }

  onLogout(): void {
    this.authService.signOutUser().pipe(takeUntil(this.ngUnsubscribe$)).subscribe();
  }

  onDelete(): void {
    const dialogData: IDialogData = {
      id: 'accountDeleteConfirmationModal',
      title: {
        id: 'accountDeleteConfirmationModalTitle',
        title: 'Are you sure you want to delete your account?',
      },
      hasCloseBtn: true,
      bodyContent: 'These action is irreversible',
      hasFooter: true,
      buttons: [
        {
          isCloseBtn: true,
          btnClasses: ['btn', 'btn-secondary'],
          text: 'Cancel',
        },
        {
          isCloseBtn: false,
          btnClasses: ['btn', 'btn-danger', 'text-white'],
          text: 'Confirm',
        },
      ],
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData,
    });

    dialogRef.componentInstance.confirm
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        concatMap(() => {
          dialogRef.close();
          return this.authService.deleteUser();
        }),
      )
      .subscribe();
  }

  onPasswordChange(): void {
    const dialogData: IDialogData = {
      id: 'passwordChangeModal',
      title: {
        id: 'passwordChangeModalTitle',
        title: 'Renew password',
      },
      hasCloseBtn: true,
      inputTemplateRef: this.passwordChangeRef,
      hasFooter: true,
      buttons: [
        {
          isCloseBtn: true,
          btnClasses: ['btn', 'btn-secondary'],
          text: 'Cancel',
        },
        {
          isCloseBtn: false,
          btnClasses: ['btn', 'btn-danger', 'text-white'],
          text: 'Confirm',
        },
      ],
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData,
    });

    this.passwordForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value) => {
      if (value.newPassword !== value.confirmPassword) {
        this.passwordForm.setErrors({ notMatch: 'Passwords do not match' });
      }
    });

    dialogRef.componentInstance.confirm
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        concatMap(() => {
          if (this.passwordForm.hasError('notMatch')) {
            return this.errorHandler.handleError({
              name: 'Error!',
              message: 'Passwords do not match. try again!',
            });
          }
          dialogRef.close();
          const newPassword = this.passwordForm.get('newPassword')?.value;
          return this.authService.updateUserPassword(newPassword);
        }),
      )
      .subscribe();
  }

  handleImage(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      this.imageFile = target.files[0];
      reader.onload = (event: ProgressEvent): void => {
        this.imagePathControl?.setValue((<FileReader>event.target).result);
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(target.files[0]);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
