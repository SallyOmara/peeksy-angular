import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../../features/pages/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.cartService.cartCount.next(res.numOfCartItems);
          this.toastrService.success(res.message, 'Peeksy');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToWishlist(id: string): void {
    this.wishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          console.log('added');

          this.product.inWishlist = !this.product.inWishlist;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProductFromWishlist(id: string): void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        console.log('removed');

        this.product.inWishlist = !this.product.inWishlist;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
