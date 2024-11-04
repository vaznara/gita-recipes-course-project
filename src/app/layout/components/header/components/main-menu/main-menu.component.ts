import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'rcp-main-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent { }
