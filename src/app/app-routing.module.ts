import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { ShopsComponent } from './shops/shops.component';
import { PaintingsComponent } from './paintings/paintings.component';
import { HomeComponent } from './home/home.component';
import { PaintingsByShopComponent } from './paintings-by-shop/paintings-by-shop.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shops', component: ShopsComponent},
  {path: 'shops/:id', component: PaintingsByShopComponent},
  {path: 'paintings', component: PaintingsComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
