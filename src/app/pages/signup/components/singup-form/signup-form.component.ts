import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ISignUpUser } from '../../../../shared/interfaces/interface';

@Component({
  selector: 'rcp-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {

  @Output() createUser: EventEmitter<ISignUpUser> = new EventEmitter();

  signupForm: FormGroup = new FormGroup({
    fullName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  })

  get fullName(): AbstractControl<string | FormControl> | null {
    return this.signupForm.get('fullName');
  }

  get email(): AbstractControl<string | FormControl> | null {
    return this.signupForm.get('email');
  }

  get password(): AbstractControl<string | FormControl> | null {
    return this.signupForm.get('password');
  }

  onSubmit(): void {
    this.createUser.emit(this.signupForm.value);
  }
}
