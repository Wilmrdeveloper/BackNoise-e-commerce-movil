import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from '../../core/models/product.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage {

  items$ = this.favoritesService.items$;

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private toastController: ToastController,
    private router: Router
  ) { }

  remove(product: Product) {
    this.favoritesService.toggleFavorite(product);
  }

  async addToCart(product: Product) {
    this.cartService.addToCart(product);

    const toast = await this.toastController.create({
      message: `${product.name} agregado al carrito`,
      duration: 1500,
      color: 'dark',
      position: 'bottom'
    });

    await toast.present();
  }

  goToDetail(product: Product) {
    this.router.navigate(['/product', product.id]);
  }
}