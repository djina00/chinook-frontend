import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePage } from './home-page/home-page';
import { SharedModule } from '../shared/shared.module';
import { TracksModule } from './tracks/tracks.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    TracksModule
  ]
})
export class PagesModule { }