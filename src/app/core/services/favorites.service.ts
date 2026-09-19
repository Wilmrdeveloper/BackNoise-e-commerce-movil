import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

const FAVORITES_KEY = 'bn_favorites';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {

    private itemsSubject = new BehaviorSubject<Product[]>(this.loadFromStorage());
    items$ = this.itemsSubject.asObservable();

    isFavorite(productId: number): boolean {
        return this.itemsSubject.value.some(p => p.id === productId);
    }

    toggleFavorite(product: Product): void {
        const current = this.itemsSubject.value;
        const exists = current.some(p => p.id === product.id);

        const updated = exists
            ? current.filter(p => p.id !== product.id)
            : [...current, product];

        this.itemsSubject.next(updated);
        this.saveToStorage(updated);
    }

    removeFavorite(productId: number): void {
        const updated = this.itemsSubject.value.filter(p => p.id !== productId);
        this.itemsSubject.next(updated);
        this.saveToStorage(updated);
    }

    getFavorites(): Product[] {
        return this.itemsSubject.value;
    }

    private loadFromStorage(): Product[] {
        const raw = localStorage.getItem(FAVORITES_KEY);
        return raw ? JSON.parse(raw) : [];
    }

    private saveToStorage(items: Product[]): void {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
    }
}