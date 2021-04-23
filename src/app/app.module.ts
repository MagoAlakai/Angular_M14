import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShopsComponent } from './shops/shops.component';
import { PaintingsComponent } from './paintings/paintings.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaintingsByShopComponent } from './paintings-by-shop/paintings-by-shop.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
//import { PaintingFormComponent } from './painting-form/painting-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent,
    PaintingsComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PaintingsByShopComponent,
    ShopFormComponent,
    //PaintingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
