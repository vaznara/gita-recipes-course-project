import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'rcp-recipe-header',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './recipe-header.component.html',
  styleUrl: './recipe-header.component.scss',
})
export class RecipeHeaderComponent implements OnInit {
  @Input() recipeKey: string | null = null;

  recipeLink: string = '';

  constructor(
    private clipboard: Clipboard,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recipeLink =
      this.router.url === '/recipe/view'
        ? `${window.location.href}/${this.recipeKey}`
        : this.router.url;
  }

  onShare(tooltip: MatTooltip): void {
    this.clipboard.copy(this.recipeLink);
    tooltip.show();
    setTimeout(() => tooltip.hide(), 2000);
  }
}
