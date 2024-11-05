import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  selector: 'rcp-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
