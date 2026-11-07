import { Component, input } from '@angular/core';
import { MovieDetails } from '../../models/movie.model';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-movie-details-modal',
  styleUrl: './movie-details-modal.css',
  templateUrl: './movie-details-modal.html',
})
export class MovieDetailsModal {
  //Input sin required porque el modal existe inicialmente sin película
  readonly movie = input<MovieDetails | null>(null);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
}
