import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CartItem } from '../../core/models/cart-item.model';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';

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
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  async checkout() {
    const items = this.cartService.getItems();

    if (items.length === 0) {
      await this.showAlert('Carrito vacío', 'Agrega productos antes de finalizar la compra.');
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    const total = this.cartService.getTotal();
    const order = this.orderService.createOrder(items, total, user.email);

    this.cartService.clearCart();
    this.router.navigate(['/order-confirmation'], { state: { orderId: order.id } });
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