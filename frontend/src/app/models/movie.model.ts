export interface Movie {
  //Interface describe que propiedades debe tener un objeto
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieResponse {
  //Interface que describe un arreglo de películas
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  //Interface para el filtro por genero
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  //Interface para los detalles adicionales
  overview: string;
  genres: Genre[];
  runtime: number | null;
}
