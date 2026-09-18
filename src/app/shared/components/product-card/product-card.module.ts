import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProductCardComponent } from './product-card.component';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [ProductCardComponent],
    exports: [ProductCardComponent]
})
export class ProductCardComponentModule { }