import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  user: User | null = null;
  ordersCount = 0;
  favoritesCount = 0;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private favoritesService: FavoritesService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();

    if (this.user) {
      this.ordersCount = this.orderService.getOrders()
        .filter(o => o.userEmail === this.user!.email).length;
    }

    this.favoritesService.items$.subscribe(items => {
      this.favoritesCount = items.length;
    });
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Seguro que quieres cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Cerrar sesión',
          role: 'destructive',
          handler: () => {
            this.authService.logout();
            this.router.navigateByUrl('/register');
          }
        }
      ]
    });
    await alert.present();
  }
}
