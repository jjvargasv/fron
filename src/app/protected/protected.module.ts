import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { ProductsComponent } from './pages/products/products.component';
import { NewProductComponent } from './pages/products/new-product/new-product.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';

import { ResenasComponent } from './pages/resenas/resenas.component';
import { ListResenasComponent } from './pages/resenas/list-resenas/list-resenas.component';
import { LisCategoriesComponent } from './pages/categories/lis-categories/lis-categories.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ListContactoComponent } from './pages/contacto/list-contacto/list-contacto.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    ProductsComponent,
    NewProductComponent,
    UpdateProductComponent,
    CategoriesComponent,

    ResenasComponent,
    ListResenasComponent,
    LisCategoriesComponent,
    ContactoComponent,
    ListContactoComponent,
    
  ],
  imports: [CommonModule, ProtectedRoutingModule, ReactiveFormsModule],
})
export class ProtectedModule {}
