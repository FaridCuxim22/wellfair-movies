import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

//Configuración de las funcionalidades necesarias
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
