import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false,
})
export class ProductDetailPage implements OnInit {

  product$!: Observable<Product | undefined>;
  selectedSize: string | null = null;
  isFavorite = false;
  private currentProduct: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productService.getProductById(id);

    this.product$.subscribe(product => {
      if (product) {
        this.currentProduct = product;
        this.isFavorite = this.favoritesService.isFavorite(product.id);
      }
    });

    this.favoritesService.items$.subscribe(() => {
      if (this.currentProduct) {
        this.isFavorite = this.favoritesService.isFavorite(this.currentProduct.id);
      }
    });
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  toggleFavorite() {
    if (this.currentProduct) {
      this.favoritesService.toggleFavorite(this.currentProduct);
    }
  }

  async addToCart() {
    if (!this.currentProduct) {
      return;
    }

    if (!this.selectedSize) {
      const toast = await this.toastController.create({
        message: 'Selecciona una talla antes de comprar',
        duration: 1500,
        color: 'warning',
        position: 'bottom'
      });
      await toast.present();
      return;
    }

    this.cartService.addToCart(this.currentProduct);
    const toast = await this.toastController.create({
      message: `${this.currentProduct.name} (talla ${this.selectedSize}) agregado al carrito`,
      duration: 1500,
      color: 'dark',
      position: 'bottom'
    });
    await toast.present();
  }
}