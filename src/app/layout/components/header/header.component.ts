import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SearchComponent } from './components/search/search.component';
import { UserControlComponent } from './components/user-control/user-control.component';

@Component({
  selector: 'rcp-header',
  standalone: true,
  imports: [RouterLink, MainMenuComponent, SearchComponent, UserControlComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuthorized: boolean = true;

  logout(): void {}
}
