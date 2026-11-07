import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '', //Cuando la URL sea /
    component: Home,
    title: 'Películas populares | WellFair Movies',
  },
];
