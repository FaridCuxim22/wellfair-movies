import { Component, input, output } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-movie-card',
  styleUrl: './movie-card.css',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  //Input permite declarar información que un componente recibe desde otro componente
  readonly movie = input.required<Movie>();

  //Output para enviar el id de la película seleccionada
  readonly detailsRequested = output<number>();

  showDetails(): void {
    this.detailsRequested.emit(this.movie().id);
  }
}
