import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { FavoritesPageRoutingModule } from './favorites-routing.module';
import { FavoritesPage } from './favorites.page';
import { BackButtonComponentModule } from '../../shared/components/back-button/back-button.module';
import { BottomNavComponentModule } from '../../shared/components/bottom-nav/bottom-nav.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule,
    FavoritesPageRoutingModule, BackButtonComponentModule, BottomNavComponentModule
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule { }
