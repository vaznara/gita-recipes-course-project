import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly dummyCategoriesData: ICategory[] = [
    {
      id: 1, name: "Seafood", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tempore ratione adipisci doloribus in nesciunt asperiores debitis magnam quae fugit vero, aliquid, rem soluta expedita cumque eius quo quis iusto.",
      img: "https://picsum.photos/500"
    },
    {
      id: 2, name: "Soup", description: "Minima autem alias aliquam facere ipsa voluptatem voluptatibus odit deserunt expedita voluptate possimus obcaecati dolorum reiciendis doloribus excepturi iure dolor quas reprehenderit perspiciatis ducimus, est nihil aut, repellat inventore! Temporibus.",
      img: "https://picsum.photos/500"
    },
    {
      id: 3, name: "Pancakes", description: "Alias temporibus unde ipsam ipsa impedit eveniet dolore, enim tenetur ratione, distinctio facilis! Magni maxime cumque rem quas deserunt laboriosam vitae incidunt, sed a consequuntur, soluta, aperiam praesentium cupiditate beatae!",
      img: "https://picsum.photos/500"
    },
    {
      id: 4, name: "Meat", description: "Magni ratione iste in. Blanditiis odit officia officiis, accusantium, magnam perspiciatis laboriosam animi architecto facilis ea assumenda atque nihil voluptas ipsa, ratione repellat consequuntur commodi voluptates dolorem sed neque aliquam!",
      img: "https://picsum.photos/500"
    },
    {
      id: 5, name: "Chicken", description: "Eos vero ex soluta cum aliquid totam autem rerum quo praesentium ipsam, ullam omnis non excepturi dolore cupiditate recusandae ipsa, nulla ratione optio suscipit fugiat eveniet. Commodi, repellat? Beatae, a!",
      img: "https://picsum.photos/500"
    },
    {
      id: 6, name: "Less than 30 min", description: "Fugiat esse molestiae, nam quam exercitationem ullam. Accusamus nemo totam maiores pariatur voluptatibus enim sapiente velit esse sequi dicta odit, ducimus sunt voluptates blanditiis nisi. Sit beatae rem aspernatur repellat.",
      img: "https://picsum.photos/500"
    },
    {
      id: 7, name: "Pasta", description: "Possimus nostrum maiores id, illo dolor quasi delectus quod ex suscipit eaque corporis deserunt voluptatibus! Illo, quasi sint? Error, delectus nisi itaque tenetur vel quam hic soluta mollitia obcaecati impedit.",
      img: "https://picsum.photos/500"
    },
    {
      id: 8, name: "Pizza", description: "Ut delectus est ex necessitatibus vitae facilis aliquid nobis veritatis natus expedita cum reiciendis, nam, ducimus praesentium similique et. Earum voluptatibus tempora iusto dolores debitis! Officiis quos omnis commodi possimus!",
      img: "https://picsum.photos/500"
    },
    {
      id: 9, name: "Cake", description: "Veniam quis vel nihil vero rerum suscipit non nobis doloremque accusantium commodi dolor nam harum cupiditate eligendi tenetur sequi facilis laudantium, sunt nisi, incidunt veritatis quibusdam aliquid ex? Ex, eaque.",
      img: "https://picsum.photos/500"
    },
    { id: 10, name: "Pastries", description: "Repellat exercitationem architecto unde perspiciatis, minima vero ea odio! Earum veritatis ex magnam voluptatem nulla debitis, aspernatur quis nobis laudantium eius nisi quisquam in ipsa enim doloribus alias consequatur dignissimos!", img: "https://picsum.photos/500" },
    {
      id: 11, name: "Burger", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum nesciunt quibusdam nostrum voluptas repellat nisi perspiciatis iste obcaecati nemo quos cum saepe, debitis culpa quae velit recusandae laboriosam neque hic.",
      img: "https://picsum.photos/500"
    },
    {
      id: 12, name: "Vegan", description: "Nihil eaque mollitia delectus. Sapiente perspiciatis fugit in inventore repellat id, quia amet vel quas dolorum officia at officiis consequuntur vitae labore cum. Suscipit aperiam cupiditate, dicta commodi quas quia.",
      img: "https://picsum.photos/500"
    },
    {
      id: 13, name: "Desserts", description: "Blanditiis fuga provident ipsum minima explicabo officia assumenda natus animi. Porro sed fugit perferendis, cum fugiat exercitationem dignissimos ipsam necessitatibus voluptatem, cupiditate mollitia minus aliquid sit, odit quod quam esse!",
      img: "https://picsum.photos/500"
    },
    {
      id: 14, name: "Smoothies", description: "Ratione necessitatibus, eos voluptatum ad quia atque fuga? Inventore ut autem consequatur fuga numquam amet distinctio labore! Eum neque nulla cum nemo optio dolorum aut natus temporibus, odit possimus vitae.",
      img: "https://picsum.photos/500"
    },
    {
      id: 15, name: "Breakfast", description: "Cum nesciunt fuga veniam qui porro nemo, dolorum ea. Totam nisi ea optio esse molestias ducimus ab, laboriosam, rerum nesciunt eos magnam maiores saepe eum adipisci eaque quas voluptatem. Minima.",
      img: "https://picsum.photos/500"
    },
    {
      id: 16, name: "Salad", description: "Tempora dolores harum vitae architecto! Doloremque recusandae maxime eaque fuga, dicta, nemo, accusamus fugiat aspernatur veritatis hic adipisci eius inventore beatae maiores ex tempora officiis doloribus consequuntur odio laboriosam quis!",
      img: "https://picsum.photos/500"
    },
    {
      id: 17, name: "Sandwiches", description: "Veritatis nesciunt ipsa voluptatem delectus dicta dolorum! Perferendis tempora qui quas porro ipsum aliquam voluptatem perspiciatis sequi? Unde doloribus sit deleniti ducimus, consequatur labore iure, suscipit, aliquid amet ad perferendis.",
      img: "https://picsum.photos/500"
    },
    {
      id: 18, name: "Waffles", description: "Doloribus, qui aut numquam suscipit et repellendus totam soluta maxime. Dignissimos doloremque, iusto recusandae velit molestias quod autem quidem consectetur sit odio harum. Consequuntur in quod perspiciatis praesentium dolorum pariatur.",
      img: "https://picsum.photos/500"
    },
    {
      id: 19, name: "Ramen", description: "Accusamus ab vero totam quas quos atque deleniti aliquam repudiandae maiores, iste eveniet odio provident. Dolores ducimus repudiandae eaque dolor adipisci veritatis aperiam quam officia pariatur cupiditate? Maiores, tempore corporis.",
      img: "https://picsum.photos/500"
    },
    { id: 20, name: "Dips", description: "Non veniam sint a! Reprehenderit a, iure accusantium ullam aut similique possimus ea deleniti, molestias, unde nostrum? Doloribus, vel. Ducimus molestias libero corporis quibusdam aliquid architecto tempore magnam voluptatibus. Ab!", img: "https://picsum.photos/500" }
  ];

  constructor() { }

  getCategories(): Observable<ICategory[]> {
    return of(this.dummyCategoriesData)
  }

  getCategory(id: number): Observable<ICategory | undefined> {
    return of(this.dummyCategoriesData.find(item => item.id === id))
  }
}
