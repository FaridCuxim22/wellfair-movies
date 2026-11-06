package com.wellfair.backend.service;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

@Service //Indicar que contiene lógica de negocio
public class TmdbService {
    private final RestClient restClient;

    //Constructor
    public TmdbService(
        RestClient.Builder builder,
        @Value("${tmdb.api.token}") String token
    ) {
        //Se construye el cliente
        this.restClient = builder
        .baseUrl("https://api.themoviedb.org/3")
        .defaultHeader(
            HttpHeaders.AUTHORIZATION,
            "Bearer " + token
        )
        .build();
    }

    //Método para las películas populares
    public String getPopularMovies (){
        String result = restClient.get() //Petición HTTP GET
            .uri("/movie/popular") //Recurso a consultar
            .retrieve() //Ejecutar la solicitud
            .body(String.class); 

        return result;
    }

    //Método para una película en específico
    public String searchMovie(String query) {
        String result = restClient.get()
            .uri(uriBuilder -> uriBuilder //Construcción correcta del URL
                .path("/search/movie")
                .queryParam("query", query)
                .queryParam("language", "es-MX")
                .build()
            )
            .retrieve()
            .body(String.class);

        return result;
    }

    //Método para los detalles de una película
    public String detailsMovie(int id) {
        String result = restClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/movie/{movie_id}")
                .build(id) //Argumentos para la variable de ruta
            )
            .retrieve()
            .onStatus(status -> status.value() ==  404,
                (request, response) -> {
                    throw new ResponseStatusException (
                        HttpStatus.NOT_FOUND,
                        "No se encontró la película solicitada"
                    );
                })   
            .body(String.class);

        return result;
    }
}