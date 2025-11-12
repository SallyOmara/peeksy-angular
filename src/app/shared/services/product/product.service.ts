import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(pageNum: number = 1): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `products?page=${pageNum}`
    );
  }

  getCategoryProducts(categoryId: string | null): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `products?category[in]=${categoryId}`
    );
  }

  getBrandProducts(brandId: string | null): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `products?brand=${brandId}`
    );
  }
}
