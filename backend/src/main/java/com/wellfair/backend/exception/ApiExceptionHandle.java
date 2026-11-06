package com.wellfair.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import org.springframework.web.server.ResponseStatusException;

import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.ResourceAccessException;

@RestControllerAdvice //Para indicar a spring que se manejarán excepciones
public class ApiExceptionHandle {
    
    // Errores de validación y recursos inexistentes
    @ExceptionHandler(ResponseStatusException.class) //Asocia el método con un tipo concreto de excepción
    public ProblemDetail handleRequestError (ResponseStatusException ex) {
        String message = ex.getReason() != null
            ? ex.getReason()
            : "La solicitud no pudo procesarse";

        return ProblemDetail.forStatusAndDetail (ex.getStatusCode(), message);
    }

    // TMDB devuelve una respuesta HTTP de error
    @ExceptionHandler(RestClientResponseException.class)
    public ProblemDetail handleTmdbError (RestClientResponseException ex) {
        HttpStatus status = ex.getStatusCode().value() == 429
            ? HttpStatus.SERVICE_UNAVAILABLE
            : HttpStatus.BAD_GATEWAY;

        return ProblemDetail.forStatusAndDetail (status, "No se pudo obtener información de TMDB");
    }

    // No se pudo establecer o completar la comunicación
    @ExceptionHandler(ResourceAccessException.class)
    public ProblemDetail handleConnectionError (ResourceAccessException ex) {

        return ProblemDetail.forStatusAndDetail (HttpStatus.SERVICE_UNAVAILABLE, "No fue posible conectar con TMDB");

    }

}
