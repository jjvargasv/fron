import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  userId!: string;
  products!: Array<Product>;

  constructor(
    private authService: AuthService,
    private productsService: ProductsService
  ) {
    this.userId = this.authService.user._id;
  }

  ngOnInit(): void {
    this.productsService.getProductsByUser( this.userId )
      .subscribe( value => {
        console.log( value );

        this.products = value;
      });
  }

  delete( id: string | undefined ) {
    this.productsService.deleteProduct( id )
      .subscribe( value => {
        console.log( value );

        this.products = this.products.filter( product => product._id != value._id );

      });
  }

}
