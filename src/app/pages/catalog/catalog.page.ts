import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: false,
})
export class CatalogPage {

  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastController: ToastController
  ) {
    this.products$ = this.productService.getProducts();
  }

  async onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    const toast = await this.toastController.create({
      message: `${product.name} agregado al carrito`,
      duration: 1500,
      color: 'dark',
      position: 'bottom'
    });
    await toast.present();
  }
}