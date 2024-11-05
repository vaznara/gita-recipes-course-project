import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../../../../../pages/login/login-form/login-form.component';

@Component({
  selector: 'rcp-user-control',
  standalone: true,
  imports: [],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.scss',
})
export class UserControlComponent {

  constructor(private dialog: MatDialog) { }

  onLogin(): void {
    this.dialog.open(LoginFormComponent);
  }
}
