import { Component, inject, OnInit, signal } from '@angular/core';

import { Movie, MovieDetails } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieDetailsModal } from '../../components/movie-details-modal/movie-details-modal';

//Para indicar que la clase Home representa un componente visual
@Component({
  imports: [MovieCard, MovieDetailsModal], //Habilita elementos para usar dentro de la plantilla
  standalone: true, //Declara que es un componente independiente
  selector: 'app-home', //Nombre para utilizar el componente
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private readonly movieService = inject(MovieService); //Solicita una instancia de MovieService para construir el cliente HTTP

  /*Signal es un contenedor reactivo de un valor, Angular puede saber cuándo 
  ese valor cambia y actualizar las partes de la interfaz que dependen de él
  */
  //Estados reactivos
  readonly movies = signal<Movie[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly hasSearched = signal(false); //Para distinguir si se muestran películas populares o resultados de una búsqueda
  readonly searchedTitle = signal('');

  readonly selectedMovie = signal<MovieDetails | null>(null);
  readonly detailsLoading = signal(false);
  readonly detailsError = signal<string | null>(null);

  //Método invocado durante la inicialización del componente (Carga inicial de la página)
  ngOnInit(): void {
    this.loadPopularMovies();
  }

  //Carga las películas populares
  loadPopularMovies(): void {
    this.loading.set(true);
    this.error.set(null);
    this.hasSearched.set(false);
    this.searchedTitle.set('');

    this.movieService.getPopularMovies().subscribe({
      //Subscribe inicia la solicitud HTTP y permite manejar su resultado
      next: (response) => {
        this.movies.set(response.results); //Modificar signal de movies
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar las películas.');
        this.loading.set(false);
      },
    });
  }

  //Busca las películas por título
  searchMovies(event: Event, query: string): void {
    event.preventDefault(); //Evita que el form realice su comportamiento tradicional
    const title = query.trim();

    if (!title) {
      this.error.set('Debes escribir el título de una película');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.hasSearched.set(true);
    this.searchedTitle.set(title);

    this.movieService.searchMovies(title).subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.loading.set(false);
      },
      error: () => {
        this.movies.set([]);
        this.error.set('No fue posible realizar la búsqueda');
        this.loading.set(false);
      },
    });
  }

  //Carga los detalles de la película seleccionada
  openMovieDetails(id: number): void {
    //Se limpian los datos y errores de la película anteriormente seleccionada
    this.selectedMovie.set(null);
    this.detailsError.set(null);
    this.detailsLoading.set(true);

    this.movieService.getMovieDetails(id).subscribe({
      next: (response) => {
        this.selectedMovie.set(response);
        this.detailsLoading.set(false);
      },
      error: () => {
        this.detailsError.set('No fue posible obtener los detalles de la película');
        this.detailsLoading.set(false);
      },
    });
  }
}
