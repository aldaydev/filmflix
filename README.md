# Filmflix

### feat/film-search-list
* Creación del componente search-list que contendrá el listado de películas
* Creación de film-car y configuración de los inputs
* Aplicando @defer y ajustes generales del listado

### feat/film-search
* Creación del componente search-page
* Creación de componentes searcher, search-by-name, search-by-filters
* Diseño del header donde se podrán aplicar filtros
* Trabajando selección de opciones "por filtro" y haciendo llamada a la API

### feat/film-videos
* Creación del componente film-videos (modal)
* Creación de la lógica de abrir y cerrar el modal
* Creación del iframe para reproducir vídeos

### feat/film-similar
* Creación del componente/carousel de películas similares
* Ajustes y mejoras en el componente reutilizable del carousel
* Fix: Actualización automática de los datos al navegar de una página de película a otra
* Fix: Actualización de las estrellas al navegar de una página de película a otra
* Creación del footer para buscar películas dentro de film-page

### feat/film-hero
* Trabajando sobre el componente film-page-hero
* Creando el componente five-stars-rate y star-rate
* Creando diseño superior de la página de película
* Refactorización del código

### feat/film-service
* Creación del servicio FilmService
* Trabajando en los tipos de las películas
* Pruebas de recibir data en un componente

### feat/home-faq
* Creación del componente homeFaq
* Creación del componente faqExpansor
* Creación de la lógica del faqExpansor
* Introducción de toda la información

### feat/home-features
* Creación del componente homeFeatures
* Creación del componente homeInfoCard
* Trabajando estilos y responsive

### feat/home-carousel
* Creación del componente reutilizable "filmCarousel"
* Creación del servicio "popularFilmsService"
* Estilos, lógica y enrutamiento de "filmCarousel"
* Creacín inicial de la página "film/:id" para checkear
* Ajustes finales en el componente homeCrousel

### feat/home-whatsnew
* Creación del componente "whats-new" en la homePage
* Creación de estilos y componrtamiento responsive.

### feat/home-hero
* Creando componente "hero" en la homePage
* Trabajando el diseño del hero section
* Creación del componente botón reutilizable
* Creación del componente input reutilizable
* Creación del separador inferior curvo del "hero" 

### feat/header
* Creando header fixed o sticky
* Ajustando background en función al scroll / theme

### feat/theme-mode
* Creación del servicio themeService
* Creación del componente toggleTheme y su hijo toggleThemeIcon
* Funcionalidad de theme-mode inicial creada

### core
* Configuración inicial del proyecto
* Ajustes en angular.json
* Creación de componentes iniciales
* Estilos inciales y resets
* Creación de "alias" de typescript inciales

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
