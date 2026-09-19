import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ProductCardComponentModule } from '../../shared/components/product-card/product-card.module';
import { BottomNavComponentModule } from '../../shared/components/bottom-nav/bottom-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ProductCardComponentModule,
    BottomNavComponentModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }