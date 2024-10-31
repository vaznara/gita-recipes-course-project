import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'rcp-search',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          // transform: 'scaleX(0)',
          width: '0',
          opacity: 0,
          // transformOrigin: 'right'
        }),
      ),
      state(
        'open',
        style({
          // transform: 'scaleX(1)',
          width: '10rem',
          opacity: 1,
          // transformOrigin: 'right'
        }),
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SearchComponent {
  isOpen: boolean = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
