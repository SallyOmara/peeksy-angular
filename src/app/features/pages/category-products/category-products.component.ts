import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../shared/services/product/product.service';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CardComponent, SearchPipe, FormsModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css',
})
export class CategoryProductsComponent implements OnInit {
  productList: Product[] = [];
  id: string | null = null;
  text: string = '';
  private readonly productsService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getId();
    this.getCategoryProductsData();
  }

  getCategoryProductsData() {
    this.productsService.getCategoryProducts(this.id).subscribe({
      next: (res) => {
        this.productList = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (URLparams) => {
        this.id = URLparams.get('id');
      },
    });
  }
}
