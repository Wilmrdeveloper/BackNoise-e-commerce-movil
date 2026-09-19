import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ProductCardComponent } from './product-card.component';

@NgModule({
    imports: [CommonModule, IonicModule, RouterModule],
    declarations: [ProductCardComponent],
    exports: [ProductCardComponent]
})
export class ProductCardComponentModule { }