import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false,
})
export class IntroPage implements OnInit {

  isLoading = true;
  showButton = false;
  showFullName = false;          // ← nueva variable

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();

      // Un poco después de que el fondo se vuelva blanco, expandimos el nombre
      setTimeout(() => {
        this.showFullName = true;
        this.cdr.detectChanges();
      }, 400);

      // El botón aparece un poco más tarde
      setTimeout(() => {
        this.showButton = true;
        this.cdr.detectChanges();
      }, 900);
    }, 1800);
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}