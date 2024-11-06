import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rcp-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  })

  get email(): AbstractControl<string | FormControl> | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl<string | FormControl> | null {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    console.log(this.loginForm.value)
  }
}
