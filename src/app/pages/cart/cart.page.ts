import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage {

  items$ = this.cartService.items$;

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController
  ) { }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  goToCheckout() {
    const items = this.cartService.getItems();

    if (items.length === 0) {
      this.showAlert(
        'Carrito vacío',
        'Agrega productos antes de continuar.'
      );
      return;
    }

    this.router.navigateByUrl('/checkout');
  }

  increase(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}