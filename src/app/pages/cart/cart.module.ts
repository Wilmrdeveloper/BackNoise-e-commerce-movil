import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
import { BackButtonComponentModule } from '../../shared/components/back-button/back-button.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, CartPageRoutingModule, BackButtonComponentModule],
  declarations: [CartPage]
})
export class CartPageModule { }