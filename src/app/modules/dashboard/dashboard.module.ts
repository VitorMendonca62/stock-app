import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { MainComponent } from './components/main/main.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './components/categories/components/create-category/create-category.component';
import { SaleComponent } from './components/sale/sale.component';
import { MessageComponent } from '../../shared/message/message.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    ProductsComponent,
    MainComponent,
    CategoriesComponent,
    CreateProductComponent,
    CreateCategoryComponent,
    SaleComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MessageComponent,
  ],
  bootstrap: [
    HeaderComponent,
    DashboardComponent,
    ProductsComponent,
    MainComponent,
    CategoriesComponent,
    CreateProductComponent,
    CreateCategoryComponent,
    SaleComponent,
  ],
})
export class DashboardModule {}
