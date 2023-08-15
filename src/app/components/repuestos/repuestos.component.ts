import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/auth/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.css']
})
export class RepuestosComponent implements OnInit {
  products: Products = { products: [] };
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProductByCategory('repuestos').subscribe((res) => {
      this.products.products = res;
    });
  }
}
