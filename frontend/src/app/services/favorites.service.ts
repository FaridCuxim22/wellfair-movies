import { Injectable, signal } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  //Para identificar datos dentro de localStore
  private readonly storageKey = 'wellfair-movies-favorites';

  /*Signal que almacena un arreglo de películas
  Al iniciar la aplicación, intentará recuperar las películas guardadas*/
  private readonly _favorites = signal<Movie[]>(this.loadFavorites());

  //convierte el signal en una versión de solo lectura
  readonly favorites = this._favorites.asReadonly();

  //Comprueba si al menos un elemento del arreglo ya está marcado como favorito
  isFavorite(id: number): boolean {
    return this.favorites().some((movie) => movie.id === id);
  }

  /*Si la película ya es favorita, filter crea un arreglo sin esa película
  Si no es favorita, usa ... para crear un arreglo que incluya lo fav anteriores y la película nueva*/
  toggleFavorite(movie: Movie): void {
    const updated = this.isFavorite(movie.id)
      ? this.favorites().filter((item) => item.id !== movie.id)
      : [...this.favorites(), movie];

    //Actualiza el estado reactivo
    this._favorites.set(updated);

    //Guarda los cambios en el navegador
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  private loadFavorites(): Movie[] {
    try {
      const saved = localStorage.getItem(this.storageKey);

      //Si no se puede recuperar los favoritos, comienza con un arreglo vacío
      if (!saved) {
        return [];
      }

      const data: unknown = JSON.parse(saved);

      return Array.isArray(data) ? (data as Movie[]) : [];
    } catch {
      return [];
    }
  }
}
