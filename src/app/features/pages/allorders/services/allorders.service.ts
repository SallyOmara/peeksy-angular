import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  getAllUserOrder(id: string | undefined): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${id}`);
  }
}
