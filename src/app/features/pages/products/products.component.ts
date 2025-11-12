import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../../shared/services/product/product.service';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../../shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  wishlistIds: string[] = [];
  pageSize!: number;
  p!: number;
  total!: number;
  text: string = '';
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

        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
