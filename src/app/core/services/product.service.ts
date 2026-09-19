import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private readonly dataUrl = 'assets/data/products.mock.json';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.dataUrl);
    }

    getProductById(id: number): Observable<Product | undefined> {
        return this.getProducts().pipe(
            map(products => products.find(p => p.id === id))
        );
    }
}