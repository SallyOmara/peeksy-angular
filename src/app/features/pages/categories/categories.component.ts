import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Category } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoryService);

  ngOnInit(): void {
    this.getAllCat();
  }
  allCategories: Category[] = [];
  getAllCat(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
