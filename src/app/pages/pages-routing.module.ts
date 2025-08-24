import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { Albums } from './albums/albums';
import { Cart } from './cart/cart';

const routes: Routes = [
  {
    path: "",
    component: HomePage
  },
  {
    path: "albums",
    component: Albums
  },
  {
    path: "cart",
    component: Cart
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }