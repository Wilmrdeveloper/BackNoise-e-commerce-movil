import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
  standalone: false,
})
export class OrderConfirmationPage {

  order: Order | null = null;

  address = '';
  phone = '';
  payment = '';

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {
    const navigation = this.router.getCurrentNavigation();

    const orderId = (navigation?.extras.state as { orderId?: string })?.orderId;

    const state = navigation?.extras.state as {
      address?: string;
      phone?: string;
      payment?: string;
    };

    this.address = state?.address ?? '';
    this.phone = state?.phone ?? '';
    this.payment = state?.payment ?? '';

    const orders = this.orderService.getOrders();

    if (orderId) {
      this.order = orders.find(o => o.id === orderId) ?? null;
    }

    if (!this.order && orders.length > 0) {
      this.order = orders[orders.length - 1];
    }
  }

  goToCatalog() {
    this.router.navigateByUrl('/home');
  }
}