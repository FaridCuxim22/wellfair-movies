package com.wellfair.backend.controller;
import com.wellfair.backend.service.TmdbService;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController //Para indicar que se manejarán solicitudes web
@RequestMapping("/api/movies") //Ruta base para todas las operaciones de la API
public class MovieController {

    private final TmdbService tmdbService;

    //Constructor
    public MovieController(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    //Mapeo para películas populares
    @GetMapping(
        value = "/popular",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    
    public String getPopularMovies() {
        return tmdbService.getPopularMovies();
    }

    //Mapeo para película específica
    @GetMapping(
        value = "/search",
        produces = MediaType.APPLICATION_JSON_VALUE
    )

    public String searchMovies (@RequestParam(value = "query", required = false) String query) {
        if (query == null || query.isBlank()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Debes ingresar el título de una película"
            );
        }

        return tmdbService.searchMovie(query.trim());
    }

    //Mapeo para detalles de película
     @GetMapping(
        value = "/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )

    public String detailsMovie(@PathVariable("id") int id) {
        if (id <= 0) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "El identificador debe ser mayor a cero"
            );
        }
        
        return tmdbService.detailsMovie(id);
    }
}