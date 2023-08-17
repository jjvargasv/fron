
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/protected/interfaces/category.interface';
import { CategoriesService } from 'src/app/services/categories.service';



@Component({
  selector: 'app-lis-categories',
  templateUrl: './lis-categories.component.html',
  styleUrls: ['./lis-categories.component.css']
})
export class LisCategoriesComponent  implements OnInit {
  categories! : Array<Category>;    // categories! : Category[];
  selectedCategory: Category | null = null;
  selectedCategoryId!: string;

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

  loadCategory( category: Category ) {
    this.selectedCategory = category;

    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
    });
  }

  createOrUpdateCategory() {
    if ( this.selectedCategory ) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
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

  updateCategory() {

    if ( ! this.selectedCategory )  {
      console.error('Selected category is undefined.');

      return;
    }

    // Actualiza la categoría con los nuevos datos del formulario.
    this.selectedCategory.name = this.categoryForm.get( 'name' )?.value;
    this.selectedCategory.description = this.categoryForm.get( 'description' )?.value;


    const category = { ...this.selectedCategory };

    console.log( category );
    this.categoriesService.updateCategory( category )
      .subscribe( response => {
        console.log( response );
      });


    // Restablece la categoría y el formulario seleccionados después de que la actualización sea exitosa.
    this.selectedCategory = null;
    this.categoryForm.reset();
    this.loadCategories();
  }



}
