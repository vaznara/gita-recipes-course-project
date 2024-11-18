import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategoryResponse } from '../../shared/interfaces/interface';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../shared/services';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'rcp-categories',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  ngUnsubscribe$: Subject<void> = new Subject();
  categories: ICategoryResponse[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => (this.categories = res));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
