import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: false,
})
export class BottomNavComponent implements OnInit {

  cartCount = 0;
  favoritesCount = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });

    this.favoritesService.items$.subscribe(items => {
      this.favoritesCount = items.length;
    });
  }

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  goTo(path: string) {
    this.router.navigateByUrl(path);
  }
}