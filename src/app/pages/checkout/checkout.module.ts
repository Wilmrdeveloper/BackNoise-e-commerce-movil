import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';
import { CheckoutPage } from './checkout.page';
import { BackButtonComponentModule } from '../../shared/components/back-button/back-button.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CheckoutPageRoutingModule, BackButtonComponentModule],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule { }