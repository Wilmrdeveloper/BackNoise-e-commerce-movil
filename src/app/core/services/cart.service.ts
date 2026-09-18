import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private itemsSubject = new BehaviorSubject<CartItem[]>([]);
    items$ = this.itemsSubject.asObservable();

    addToCart(product: Product): void {
        const currentItems = this.itemsSubject.value;
        const existing = currentItems.find(item => item.product.id === product.id);

        if (existing) {
            existing.quantity += 1;
            this.itemsSubject.next([...currentItems]);
        } else {
            this.itemsSubject.next([...currentItems, { product, quantity: 1 }]);
        }
    }

    removeFromCart(productId: number): void {
        const updated = this.itemsSubject.value.filter(item => item.product.id !== productId);
        this.itemsSubject.next(updated);
    }

    getItems(): CartItem[] {
        return this.itemsSubject.value;
    }

    getTotal(): number {
        return this.itemsSubject.value.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );
    }

    clearCart(): void {
        this.itemsSubject.next([]);
    }
}