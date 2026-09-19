import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { BackButtonComponentModule } from '../../shared/components/back-button/back-button.module';
import { BottomNavComponentModule } from '../../shared/components/bottom-nav/bottom-nav.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule,
    ProfilePageRoutingModule, BackButtonComponentModule, BottomNavComponentModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }