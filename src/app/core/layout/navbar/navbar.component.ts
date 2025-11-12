import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { CartService } from '../../../features/pages/cart/services/cart.service';

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

  count!: number;

  @Input({ required: true }) isLogin!: boolean;

  isMenuOpen = false;
  isVisible = true;
  lastScrollY = 0;

  ngOnInit(): void {
    this.loadCartCount();

    this.getCartCount();
  }

  getCartCount(): void {
    this.cartService.cartCount.subscribe({
      next: (value) => {
        this.count = value;
      },
    });
  }

  loadCartCount(): void {
    this.cartService.getProductToCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.next(res.numOfCartItems || 0);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  signOut(): void {
    this.authService.logOut();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let currentScroll = window.scrollY;

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
