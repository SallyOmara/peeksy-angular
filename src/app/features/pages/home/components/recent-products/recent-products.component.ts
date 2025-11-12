import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { WishlistService } from '../../../../../shared/services/wishlist.service';

@Component({
  selector: 'app-recent-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.css',
})
export class RecentProductsComponent implements OnInit {
  productList: Product[] = [];
  wishlistIds: string[] = [];
  private readonly productsService = inject(ProductService);
  private readonly wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getWishlistIds();
  }

  getWishlistIds(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistIds = res.data.map(
          (item: any) => item.product?.id ?? item.id
        );
        this.getAllProductsData();
      },
      error: (err) => console.log(err),
    });
  }

  getAllProductsData(pageNum: number = 1) {
    this.productsService.getAllProducts(pageNum).subscribe({
      next: (res) => {
        this.productList = res.data.map((product: Product) => ({
          ...product,
          inWishlist: this.wishlistIds.includes(product._id),
        }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
