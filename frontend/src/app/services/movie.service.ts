import { inject, Injectable } from '@angular/core'; //Puede participar en el sistema de inyección de dependencias
import { HttpClient } from '@angular/common/http'; //Cliente para realizar peticiones HTTP
import { Observable } from 'rxjs'; //Para trabajar con operaciones asíncronas

import { MovieResponse, MovieDetails } from '../models/movie.model';

//Indica que se puede administrar este servicio y compartir mediante inyección de dependencias
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  //readonly: No se puede reasignar la propiedad después de inicializarla.
  private readonly http = inject(HttpClient); //Solicita una instancia del cliente HTTP

  //Método que obtiene las películas populares
  //El método devuelve un observable que contiene la estructura de MovieResponse
  getPopularMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>('/api/movies/popular'); //Prepara una petición GET y señala el tipo de respuesta esperado
  }

  //Método busca las películas
  searchMovies(query: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>('/api/movies/search', {
      params: { query },
    });
  }

  //Método para obtener los detalles de una película
  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`/api/movies/${id}`);
  }
}
