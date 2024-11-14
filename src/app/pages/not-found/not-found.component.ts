import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rcp-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  onClick(): void {
    this.router.navigate(['/']);
  }
}
