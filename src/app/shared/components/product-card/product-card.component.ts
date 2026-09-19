import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false,
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  isFavorite = false;

  constructor(private router: Router, private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.favoritesService.items$.subscribe(() => {
      this.isFavorite = this.favoritesService.isFavorite(this.product.id);
    });
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/product', this.product.id]);
  }
  

  onToggleFavorite(event: Event) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.product);
  }

  openDetail() {
    this.router.navigate(['/product', this.product.id]);
  }
}