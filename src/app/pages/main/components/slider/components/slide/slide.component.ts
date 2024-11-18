import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRecipeResponse } from '../../../../../../shared/interfaces/interface';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  selector: 'rcp-slide',
  standalone: true,
  imports: [NgStyle, NgOptimizedImage],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss',
})
export class SlideComponent {
  @Input() slide!: IRecipeResponse;
  @Input() isPriorityImage: boolean = false;
  @Output() viewRecipe: EventEmitter<void> = new EventEmitter();

  onClick(): void {
    this.viewRecipe.emit();
  }
}
