import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-my-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.css',
})
export class MyWishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);

  id: string | undefined = undefined;
  wishlist!: Product[];

  ngOnInit(): void {
    this.getWishlist();
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.cartService.cartCount.next(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProductFromWishlist(id: string): void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist = this.wishlist.filter((product) => product._id !== id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
