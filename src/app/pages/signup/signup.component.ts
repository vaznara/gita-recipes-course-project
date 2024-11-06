import { Component } from '@angular/core';
import { SignupFormComponent } from './components/singup-form/signup-form.component';

@Component({
  selector: 'rcp-signup',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

}
