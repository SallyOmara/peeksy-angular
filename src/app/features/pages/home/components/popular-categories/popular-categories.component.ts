import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../../../shared/interfaces/product';
import { CategoryService } from '../../../../../shared/services/category/category.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  categoriesList: Category[] = [];
  private readonly categoriesService = inject(CategoryService);

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1100: {
        items: 6,
      },
    },
    margin: 10,
    nav: false,
  };

  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  getAllCategoriesData() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
