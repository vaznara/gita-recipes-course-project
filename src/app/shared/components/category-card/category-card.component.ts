import { Component, Input } from '@angular/core';
import { ICategoryResponse } from '../../interfaces/interface';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'rcp-category-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input() category?: ICategoryResponse;
  @Input() isPriorityImage: boolean = false;
}
