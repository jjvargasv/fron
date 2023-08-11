import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Category } from 'src/app/auth/interfaces/category.interface';
import { ProductsService } from 'src/app/services/products.service';

import { CategoriesService } from 'src/app/services/categories.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  // Atributos
  categories!: Array<any>;
  preview!: string;
  percentDone: any = 0;
  users = [];

  // Procuramos usar los mismos nombres que espera nuestra API en las propiedades que agrupamos en nuestro FormBuilder Group
  productForm: FormGroup = this.fb.group({
    name: [
      '',   // Valor por defecto
      [
        Validators.required
      ]
    ],
    price: [
      '',   // Valor por defecto
      []
    ],
    quantity: [
      '',   // Valor por defecto
      [
      ]
    ],
    category: [
      '',  // Valor por defecto
      []
    ],
    description: [
      '',  // Valor por defecto
      []
    ],
    urlImage: [ null ]
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  updateFile( event: any ) {
    const file = (event.target).files[ 0 ];

    this.productForm.patchValue({
      urlImage: file
    });

    this.productForm.get( 'urlImage' )?.updateValueAndValidity();

    /*** Leer el path del archivo para mostrar el preview */
    const reader = new FileReader();

    reader.onload = () => {
      this.preview = reader.result as string;
    };

    reader.readAsDataURL( file );
  }

  /* createProduct() {
    console.group( 'productForm' );
    console.log( this.productForm.value );
    console.log( this.productForm.valid );
    console.groupEnd();

    this.productService.createProduct( this.productForm.value )
      .subscribe( ( response ) => {
        console.log( response );
      });

    this.productForm.reset(); 
  }
 */
  
 

  create2Product() {
    console.log( this.productForm.value )

    this.productService.create2Product(
      this.productForm
    ).subscribe( ( event: HttpEvent<any> ) => {
      switch( event.type ) {
        case HttpEventType.Sent: 
          console.log( 'Peticion realizada!' );
          break;
        case HttpEventType.ResponseHeader: 
          console.log( 'La respuesta del \'header\' ha sido recibido!' );
          break;
        case HttpEventType.UploadProgress: 
          // this.percentDone = Math.round( event.loaded / event.total * 100 );
          // console.log( `Actualizado ${ this.percentDone }%` );
          console.log( `Actualizo` );
          break;
        case HttpEventType.Response: 
          console.log( 'El producto ha sido creado exitosamente!', event.body );
          this.percentDone = false;
          this.router.navigate( [ 'products' ] );
      }
    });

  }
    

  loadCategories() {
    this.categoriesService.getCategories()
      .subscribe( categories => {
        this.categories = categories;
      });
  }

}
