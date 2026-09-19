import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductCategory } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

interface QuickAction {
  label: string;
  route: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {

  isSearchOpen = false;
  searchTerm = '';
  searchSuggestions: QuickAction[] = [];

  categories: { key: ProductCategory; label: string }[] = [
    { key: 'pantalones', label: 'Pantalones' },
    { key: 'camisetas', label: 'Camisetas' },
    { key: 'chaquetas', label: 'Chaquetas' }
  ];

  private quickActions: QuickAction[] = [
    { label: 'favoritos', route: '/favorites' },
    { label: 'carrito', route: '/cart' },
    { label: 'perfil', route: '/profile' }
  ];

  private allProducts$: Observable<Product[]>;
  private searchTerm$ = new BehaviorSubject<string>('');
  private activeCategory$ = new BehaviorSubject<ProductCategory | null>(null);

  filteredProducts$: Observable<Product[]>;
  activeCategory: ProductCategory | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.allProducts$ = this.productService.getProducts();

    this.filteredProducts$ = combineLatest([
      this.allProducts$,
      this.searchTerm$,
      this.activeCategory$
    ]).pipe(
      map(([products, term, category]) => {
        const normalizedTerm = term.trim().toLowerCase();
        return products.filter(p => {
          const matchesCategory = !category || p.category === category;
          const matchesTerm = !normalizedTerm || p.name.toLowerCase().includes(normalizedTerm);
          return matchesCategory && matchesTerm;
        });
      })
    );
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.searchTerm = '';
      this.searchSuggestions = [];
      this.searchTerm$.next('');
    }
  }

  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();

    this.searchSuggestions = term
      ? this.quickActions.filter(a => a.label.includes(term))
      : [];

    const matchedCategory = this.categories.find(c => c.label.toLowerCase().includes(term));
    if (term && matchedCategory) {
      this.activeCategory = matchedCategory.key;
      this.activeCategory$.next(matchedCategory.key);
    }

    this.searchTerm$.next(this.searchTerm);
  }

  goToQuickAction(action: QuickAction) {
    this.router.navigateByUrl(action.route);
  }

  selectCategory(category: ProductCategory) {
    this.activeCategory = this.activeCategory === category ? null : category;
    this.activeCategory$.next(this.activeCategory);
  }
}