import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rcp-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  dummyData: { id: number, name: string, img: string }[] = [
    { id: 1, name: "Seafood", img: "https://picsum.photos/500" },
    { id: 2, name: "Soup", img: "https://picsum.photos/500" },
    { id: 3, name: "Pancakes", img: "https://picsum.photos/500" },
    { id: 4, name: "Meat", img: "https://picsum.photos/500" },
    { id: 5, name: "Chicken", img: "https://picsum.photos/500" },
    { id: 6, name: "Less than 30 min", img: "https://picsum.photos/500" },
    { id: 7, name: "Pasta", img: "https://picsum.photos/500" },
    { id: 8, name: "Pizza", img: "https://picsum.photos/500" },
    { id: 9, name: "Cake", img: "https://picsum.photos/500" },
    { id: 10, name: "Pastries", img: "https://picsum.photos/500" },
    { id: 11, name: "Burger", img: "https://picsum.photos/500" },
    { id: 12, name: "Vegan", img: "https://picsum.photos/500" },
    { id: 13, name: "Desserts", img: "https://picsum.photos/500" },
    { id: 14, name: "Smoothies", img: "https://picsum.photos/500" },
    { id: 15, name: "Breakfast", img: "https://picsum.photos/500" },
    { id: 16, name: "Salad", img: "https://picsum.photos/500" },
    { id: 17, name: "Sandwiches", img: "https://picsum.photos/500" },
    { id: 18, name: "Waffles", img: "https://picsum.photos/500" },
    { id: 19, name: "Ramen", img: "https://picsum.photos/500" },
    { id: 20, name: "Dips", img: "https://picsum.photos/500" }
  ];
}
