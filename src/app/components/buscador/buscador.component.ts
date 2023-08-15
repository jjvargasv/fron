import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/auth/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  products: Products = { products: [] };
  buscador!: string;
  rowsOfProducts: any[] = [];
  

  constructor(
    private productsService: ProductsService
  ) {}
  
 
  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
    this.loadProducts();
  }

  loadProducts() {
    if (this.buscador.trim() === '') {
      this.productsService.getProducts().subscribe(products => {
        this.products = products;
      });
    } else {
      this.productsService.getSearchTerm(this.buscador).subscribe(products => {
        this.products = products;
      });
    }

  }

  onSearchChange() {
    this.loadProducts();
  }

  }

