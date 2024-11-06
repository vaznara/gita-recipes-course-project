import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMenuItem } from '../../../../../shared/interfaces/interface';

@Component({
  selector: 'rcp-user-control',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserControlComponent {

  @Input() userDisplayName!: string | null;
  @Input() userPhotoPath!: string | null;
  @Input() userMenu?: IMenuItem[];

  @Output() logout: EventEmitter<void> = new EventEmitter();

  constructor() { }

  onLogout(): void {
    this.logout.emit();
  }

}
