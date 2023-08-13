import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit {
  
  constructor(private productsService: ProductsService) {

  }  
  
  
  
  ngOnInit(): void {
   this.productsService.getProductByCategory('accesorios').subscribe(res => {
      console.log(res);
    });
  }
}
