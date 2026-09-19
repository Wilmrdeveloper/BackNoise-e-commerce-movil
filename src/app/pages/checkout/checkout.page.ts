import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

type PaymentMethod = 'card' | 'cash' | 'transfer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: false,
})
export class CheckoutPage {

  address = '';
  phone = '';
  selectedPayment: PaymentMethod | null = null;

  paymentMethods: { key: PaymentMethod; label: string; icon: string }[] = [
    { key: 'card', label: 'Tarjeta', icon: 'card-outline' },
    { key: 'cash', label: 'Efectivo', icon: 'cash-outline' },
    { key: 'transfer', label: 'Transferencia', icon: 'swap-horizontal-outline' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  selectPayment(method: PaymentMethod) {
    this.selectedPayment = method;
  }

  confirmPurchase() {
    const items = this.cartService.getItems();
    const user = this.authService.getCurrentUser();

    if (!user || items.length === 0) {
      this.router.navigateByUrl('/cart');
      return;
    }

    const total = this.cartService.getTotal();
    const order = this.orderService.createOrder(items, total, user.email);

    this.cartService.clearCart();

    this.router.navigate(['/order-confirmation'], {
      state: {
        orderId: order.id,
        address: this.address || 'No especificada',
        phone: this.phone || 'No especificado',
        payment: this.selectedPayment
          ? this.paymentMethods.find(p => p.key === this.selectedPayment)!.label
          : 'No especificado'
      }
    });
  }
}