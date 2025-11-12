import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layout/blank-layout/blank-layout.component';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'Login Page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register Page',
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./core/auth/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent
          ),
        title: 'Forget Password Page',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
        title: 'Home Page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'Brands Page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/pages/cart/cart.component').then(
            (c) => c.CartComponent
          ),
        title: 'Cart Page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories Page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'Products Page',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import(
            './features/pages/product-details/product-details/product-details.component'
          ).then((c) => c.ProductDetailsComponent),
        title: 'Details Page',
      },
      {
        path: 'category-products/:id',
        loadComponent: () =>
          import(
            './features/pages/category-products/category-products.component'
          ).then((c) => c.CategoryProductsComponent),
        title: 'Category Products Page',
      },
      {
        path: 'brand-products/:id',
        loadComponent: () =>
          import(
            './features/pages/brand-products/brand-products.component'
          ).then((c) => c.BrandProductsComponent),
        title: 'Brand Products Page',
      },
      {
        path: 'my-wishlist',
        loadComponent: () =>
          import('./features/pages/my-wishlist/my-wishlist.component').then(
            (c) => c.MyWishlistComponent
          ),
        title: 'Wishlist Page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/pages/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'All Orders Page',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/pages/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'Checkout Page',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./core/auth/login/login.component').then((c) => c.LoginComponent),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    title: 'Not Found',
  },
];
