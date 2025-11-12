import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from './service/brand.service';
import { Brand } from './interface/brand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandService);

  ngOnInit(): void {
    this.getOurBrands();
  }
  allBrands: Brand[] = [];
  getOurBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
