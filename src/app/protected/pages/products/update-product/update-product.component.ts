import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

import { switchMap } from 'rxjs';
import { Product } from 'src/app/protected/interfaces/product.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  // Atributos
  categories!: Array<any>;
  productId!: string;
  product!: Product;
  preview!: any;
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
        Validators.required,
        Validators.min( 1 )
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
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.activatedRoute.params
      .pipe(
        switchMap( ( result ) => {
          const { id: productId } = result;
          this.productId = productId;

          return this.productService.getProductById( productId );
        } )
      )
      .subscribe( product => {
        console.log( product );

        /** Establece valores de producto en el atributo del componente */
        this.product = product;

        /** Establece los valores de cada uno de los campos del formulario */
        this.productForm.setValue({
          name: product?.name,
          price: product?.price,
          quantity: product?.quantity,
          category: product?.category,
          description: product?.description,
          urlImage: product?.urlImage
        });
      });


  }

  updateFile( event: any ) {
    const file = (event.target).files[ 0 ];

    this.productForm.patchValue({
      urlImage: file
    });

    this.productForm.get( 'urlImage' )?.updateValueAndValidity();
/*     this.preview = this.productForm.get('urlImage')?.updateValueAndValidity();
 */
    /*** Leer el path del archivo para mostrar el preview */
    const reader = new FileReader();

    reader.onload = () => {
      this.preview = reader.result as string;
    };

    reader.readAsDataURL( file );
  }

  updateProduct() {
    console.group( 'productForm' );
    console.log( this.productForm.value );
    console.log( this.productForm.valid );
    console.log( this.productId );
    console.groupEnd();

    this.productService.updateProduct(
      this.productId,
      this.productForm
    )
    .subscribe( ( event: HttpEvent<any> ) => {
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


    this.productForm.reset();

    setTimeout( () => {
      this.router.navigate( [ 'dashboard', 'products' ] );
    }, 1000 );

  }

  loadCategories() {
    this.categoriesService.getCategories()
      .subscribe( categories => {
        this.categories = categories;
      });
  }

}
