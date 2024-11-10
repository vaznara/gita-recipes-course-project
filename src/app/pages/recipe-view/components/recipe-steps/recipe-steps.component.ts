import { Component, Input } from '@angular/core';

@Component({
  selector: 'rcp-recipe-steps',
  standalone: true,
  imports: [],
  templateUrl: './recipe-steps.component.html',
  styleUrl: './recipe-steps.component.scss'
})
export class RecipeStepsComponent {

  @Input() steps: string[] = [];
}
