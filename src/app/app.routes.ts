import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/UI/pages/list-home/list-home.component').then((m) => m.ListHomeComponent),
  },
  {
    path: 'catbreed-home/:id',
    loadComponent: () => import('./components/home/UI/pages/catbreeds-home/catbreeds-home.component').then((m) => m.CatbreedsHomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
