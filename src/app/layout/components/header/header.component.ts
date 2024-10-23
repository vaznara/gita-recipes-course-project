import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainMenuComponent } from "./components/main-menu/main-menu.component";

@Component({
  selector: 'rcp-header',
  standalone: true,
  imports: [RouterLink, MainMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
