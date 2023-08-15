import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/auth/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css'],
})
export class AccesoriosComponent implements OnInit {
  products: Products = { products: [] };
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProductByCategory('accesorios').subscribe((res) => {
      this.products.products = res;
    });
  }
}
