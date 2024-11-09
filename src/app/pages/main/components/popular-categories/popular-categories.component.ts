import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services';
import { ICategory } from '../../../../shared/interfaces/interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rcp-popular-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit {

  private readonly MAX_LENGTH = 6;

  categories: ICategory[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => {
      // this.categories = res.slice(0, this.MAX_LENGTH)
    })
  }
}
