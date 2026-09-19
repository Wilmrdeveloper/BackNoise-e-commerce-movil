import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BottomNavComponent } from './bottom-nav.component';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [BottomNavComponent],
    exports: [BottomNavComponent]
})
export class BottomNavComponentModule { }