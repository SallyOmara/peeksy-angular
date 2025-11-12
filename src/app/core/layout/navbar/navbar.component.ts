import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { CartService } from '../../../features/pages/cart/services/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly cookieService = inject(CookieService);

  count: number = 0;

  @Input({ required: true }) isLogin!: boolean;

  isMenuOpen = false;
  isVisible = true;
  lastScrollY = 0;

  ngOnInit(): void {
    this.subscribeCartCount();
    this.loadCartCountIfLoggedIn();
  }

  /**
   * Subscribes to the cart count BehaviorSubject
   * to update the navbar counter whenever it changes.
   */
  private subscribeCartCount(): void {
    this.cartService.cartCount.subscribe({
      next: (value) => {
        this.count = value;
      },
    });
  }

  /**
   * Loads the cart count from the server only
   * if the user is logged in (token exists).
   */
  private loadCartCountIfLoggedIn(): void {
    if (!this.cookieService.check('token')) return;

    this.cartService.getProductToCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.next(res.numOfCartItems || 0);
      },
      error: (err) => {
        console.error('Error loading cart count:', err);
      },
    });
  }

  signOut(): void {
    this.authService.logOut();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
      this.isVisible = true;
    } else if (currentScroll > this.lastScrollY) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }

    this.lastScrollY = currentScroll;
  }
}
