import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ISignInUser } from '../../../../shared/interfaces/interface';

@Component({
  selector: 'rcp-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  @Output() userData: EventEmitter<ISignInUser> = new EventEmitter();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  get email(): AbstractControl<string | FormControl> | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl<string | FormControl> | null {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.userData.emit(this.loginForm.value);
  }
}
