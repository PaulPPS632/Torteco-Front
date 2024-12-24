import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/layout/layout.component').then((m) => m.LayoutComponent),
        children :[
            {
                path:'',
                loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
            },
            {
                path: 'catalog',
                loadComponent: () => import('./pages/catalog/catalog.component').then((m) =>  m.CatalogComponent)
            },
            {
                path: 'product/:slug',
                loadComponent: () => import('./pages/product/product.component').then((m) => m.ProductComponent)
            },
            {
                path: 'category/:slug',
                loadComponent: () => import('./pages/category/category.component').then((m) => m.CategoryComponent)
            },
            {
                path: 'locals',
                loadComponent: () => import('./pages/locals/locals.component').then((m) => m.LocalsComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart.component').then((m) => m.CartComponent)
            }
        ]
    },
    {
        path:'**',
        redirectTo:''
    }
];
