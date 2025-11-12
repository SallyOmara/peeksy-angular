import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductDetailsService } from '../services/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../shared/interfaces/product';
import { CartService } from '../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../shared/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  @Input() inWishlist!: boolean;

  productDetails: Product = {} as Product;
  id: string | null = null;
  mainImage: string = '';
  currentIndex: number = 0;
  wishlistIds: string[] = [];
  ngOnInit(): void {
    this.getId();
    this.getWishlistIds();
  }

  getWishlistIds(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistIds = res.data.map(
          (item: any) => item.product?.id ?? item.id
        );
        this.getProductDetailsData();
      },
      error: (err) => console.log(err),
    });
  }

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

          this.productDetails.inWishlist = true;
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

        this.productDetails.inWishlist = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductDetailsData() {
    this.productDetailsService.getDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;

        this.productDetails.inWishlist = this.wishlistIds.includes(
          this.productDetails._id
        );

        this.mainImage = this.productDetails.images[0];
      },
      error: (err) => console.log(err),
    });
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (URLparams) => {
        this.id = URLparams.get('id');
      },
    });
  }

  changeImg(imageSrc: string) {
    this.mainImage = imageSrc;
  }

  slide(step: number) {
    this.currentIndex += step;
    if (this.currentIndex == -1) {
      this.currentIndex = this.productDetails.images.length - 1;
    } else if (this.currentIndex == this.productDetails.images.length) {
      this.currentIndex = 0;
    }
    this.mainImage = this.productDetails.images[this.currentIndex];
  }
}
