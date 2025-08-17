import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Layout } from './components/layout/layout';
import { Header } from './components/layout/components/header/header';
import { Footer } from './components/layout/components/footer/footer';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    Layout,
    Header,
    Footer
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    Layout
  ]
})
export class LayoutModule { }