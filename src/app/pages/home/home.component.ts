import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/auth/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';
import { ResenasService } from 'src/app/services/resenas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Products = { products: [] };
  resenas: any = [];
  
  cart!: any []
  constructor(
    private productsService: ProductsService,
    private resenasService: ResenasService
  ) {}

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .subscribe((products) => (this.products = products));

    this.resenasService.getResenas().subscribe((resenas) => {
      this.resenas = resenas;
    });
  }

 
    addToCart(product: any) {
      console.log( product );
  
      const cartStorage = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')!) : [];
      this.cart = cartStorage 
      const foundProduct = this.cart.find(( item )=>{
        return item._id == product._id
      })
      if (foundProduct){
        foundProduct.quantity = foundProduct.quantity + 1 //foundProduct.quantity += 1
        foundProduct.total = foundProduct.price*foundProduct.quantity
        }else{
          this.cart.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            describe: product.description,
            urlImage: product.urlImage,
            total: product.price,
            stock: product.quantity
  
          })
  
      }
    localStorage.setItem('cart', JSON.stringify(this.cart)) 
    }
  }

