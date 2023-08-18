import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/auth/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-parati',
  templateUrl: './parati.component.html',
  styleUrls: ['./parati.component.css']
})
export class ParatiComponent  implements OnInit {
  products: Products = { products: [] };
  cart!: any []
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProductByCategory('parati').subscribe((res) => {
      this.products.products = res;
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
