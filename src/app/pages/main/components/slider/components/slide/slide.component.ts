import { Component, Input } from '@angular/core';
import { IRecipe } from '../../../../../../shared/interfaces/interface';

@Component({
  selector: 'rcp-slide',
  standalone: true,
  imports: [],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss'
})
export class SlideComponent {

  @Input() slide!: IRecipe;
}
