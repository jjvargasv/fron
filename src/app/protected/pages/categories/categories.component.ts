import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

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
    private fb: FormBuilder
  ) {}


  createCategory() {
    console.group( 'categoryForm' );
    console.log( this.categoryForm.value );
    console.log( this.categoryForm.valid );
    console.groupEnd();
  }
}
