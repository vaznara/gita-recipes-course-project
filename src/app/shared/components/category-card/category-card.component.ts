import { Component, Input } from '@angular/core';
import { ICategoryResponse } from '../../interfaces/interface';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  selector: 'rcp-category-card',
  standalone: true,
  imports: [RouterLink, NgStyle, NgOptimizedImage],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input() category?: ICategoryResponse;
  @Input() isPriorityImage: boolean = false;
}
