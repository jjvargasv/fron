import { Component } from '@angular/core';
import { Category } from 'src/app/auth/interfaces/category.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  categories: Array<Category> = [
    {
      _id: 'fruits',
      name: 'Fruits',
      description: 'Fruits',
    },
    {
      _id: 'vegetables',
      name: 'Vegetables',
      description: 'Vegetables',
    }
  ];
}
