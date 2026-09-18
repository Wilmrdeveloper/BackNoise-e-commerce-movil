import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Order } from '../models/order.model';

const ORDERS_KEY = 'bn_orders';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    createOrder(items: CartItem[], total: number, userEmail: string): Order {
        const order: Order = {
            id: this.generateOrderId(),
            items,
            total,
            date: new Date().toISOString(),
            userEmail
        };

        const orders = this.getOrders();
        orders.push(order);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

        return order;
    }

    getOrders(): Order[] {
        const raw = localStorage.getItem(ORDERS_KEY);
        return raw ? JSON.parse(raw) : [];
    }

    private generateOrderId(): string {
        return 'ORD-' + Date.now().toString(36).toUpperCase();
    }
}