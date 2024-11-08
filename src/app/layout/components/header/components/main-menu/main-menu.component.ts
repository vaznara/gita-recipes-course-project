import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IMenuItem } from '../../../../../shared/interfaces/interface';

@Component({
  selector: 'rcp-main-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent {

  @Input() userMenu?: IMenuItem[];
  @Input() userDisplayName?: string;
  @Input() userPhotoPath?: string;
  @Output() logout: EventEmitter<void> = new EventEmitter();

  onLogout(): void {
    this.logout.emit();
  }
}
