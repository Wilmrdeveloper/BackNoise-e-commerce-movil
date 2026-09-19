import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from './back-button.component';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [BackButtonComponent],
    exports: [BackButtonComponent]
})
export class BackButtonComponentModule { }