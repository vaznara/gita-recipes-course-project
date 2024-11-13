import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMenuItem } from '../../../../../shared/interfaces/interface';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'rcp-user-control',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserControlComponent {

  @Input() user: User | null = null;
  @Input() userMenu?: IMenuItem[];

  @Output() logout: EventEmitter<void> = new EventEmitter();

  constructor() { }

  onLogout(): void {
    this.logout.emit();
  }

}
