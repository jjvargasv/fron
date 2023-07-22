import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  userId!: string;

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
      });
  }

}
