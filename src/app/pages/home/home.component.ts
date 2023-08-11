import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/auth/interfaces/products.interface';
import { Resenas } from 'src/app/auth/interfaces/resenas.interface';
import { ProductsService } from 'src/app/services/products.service';
import { ResenasService } from 'src/app/services/resenas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Products = { products: [] };
  resenas: any = [];
  constructor(
    private productsService: ProductsService,
    private resenasService: ResenasService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe( products => this.products = products );

      this.resenasService.getResenas()
      .subscribe( resenas => {
        this.resenas = resenas
      });
  }

  addToCart() {
    console.log( 'Agrega al carrito' );
  }

}
