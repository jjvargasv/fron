import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories! : Array<Category>;    // categories! : Category[];

  // Procuramos usar los mismos nombres que espera nuestra API en las propiedades que agrupamos en nuestro FormBuilder Group
  categoryForm: FormGroup = this.fb.group({
    name: [
      '',   // Valor por defecto
      [
        Validators.required,
        Validators.minLength( 3 )
      ]
    ],
    description: [
      '',  // Valor por defecto
      []
    ]
  });

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {}


  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    console.log( 'loadCategories' )
    this.categoriesService.getCategories()
      .subscribe( categories => {
        this.categories = categories;
      });
  }

  createCategory() {
    console.group( 'categoryForm' );
    console.log( this.categoryForm.value );
    console.log( this.categoryForm.valid );
    console.groupEnd();

    this.categoriesService.createCategory( this.categoryForm.value )
      .subscribe( response => {
        console.log( response );

        this.categoryForm.reset();
        this.loadCategories();
      });

  }

  deleteCategory( categoryId: string | undefined ) {
    this.categoriesService.deleteCategory( categoryId )
      .subscribe( response => {
        console.log( response );

        this.loadCategories();
      });
  }


}
