import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ICategoryResponse } from '../../../../shared/interfaces/interface';
import { CategoryCardComponent } from '../../../../shared/components/category-card/category-card.component';

@Component({
  selector: 'rcp-popular-categories',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularCategoriesComponent implements OnInit {
  private readonly MAX_LENGTH = 6;

  @Input() categories: ICategoryResponse[] = [];

  ngOnInit(): void {
    if (this.categories.length > this.MAX_LENGTH) {
      this.categories = this.categories.slice(0, this.MAX_LENGTH);
    }
  }
}
