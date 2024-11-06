import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'rcp-login-modal',
  standalone: true,
  imports: [LoginFormComponent, MatDialogClose],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {

  readonly dialogRef = inject(MatDialogRef<LoginModalComponent>);
}
