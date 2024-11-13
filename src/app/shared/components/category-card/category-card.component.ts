import { Component, Input } from '@angular/core';
import { ICategoryResponse } from '../../interfaces/interface';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'rcp-category-card',
  standalone: true,
  imports: [RouterLink, NgStyle],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {

  @Input() category?: ICategoryResponse;
}
