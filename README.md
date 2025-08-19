# Filmflix

Filmflixes una aplicación en la que puedes buscar películas por año o por varios filtros, así como ordenar los resultados de diferentes manera. Podrás ver, además, las películas en cartelera o los próximos estrenos.

### Enlace al proyecto desplegado: 

[![VER PROYECTO](https://img.shields.io/badge/🚀_Proyecto_Desplegado-007acc?style=for-the-badge&logo=vercel&logoColor=white)](https://filmflix.alday.dev)

## Tecnilogías utilizadas para el backend:

### 💻 LENGUAJES  
![TYPESCRIPT](https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)

### 🛠️ ENTORNO DE DESARROLLO  
![ANGULAR](https://img.shields.io/badge/ANGULAR%2020-DD0031?style=for-the-badge&logo=angular&logoColor=white) 

### 🗄️ ESTILOS
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### 📦 DEPENDENCIAS
![RXJS](https://img.shields.io/badge/RXJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![NGX-INFINITE-SCROLL](https://img.shields.io/badge/NGX--INFINITE--SCROLL-DD0031?style=for-the-badge&logo=angular&logoColor=white)

### 🧪 TESTING  
![CYPRESS](https://img.shields.io/badge/CYPRESS-17202C?style=for-the-badge&logo=cypress&logoColor=white)

### 🚀 DESPLIEGUE  
![FIREBASE](https://img.shields.io/badge/FIREBASE-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

----------------------------------------------

A partir de aquí podrás ver mis anotaciones sobre cada "rama" en la que ido trabajando. 

### fix/services
* Creando llamadas a TMDB desde el servidor
    - Popular films

### fix/seo
* Arreglando las imagenes OG

### docker
* Configuración de Docker (dockerfile)

### feat/404
* Creación de NotFoundPage + estilos + rutas

### feat/e2e-tests
* Configuración de cypress para pruebas e2e
* Primer tests para ver que funciona correctamente
* Integración con Angular CLI
    - ng add @cypress/schematic
* Pruebas e2e para home-page
* Pruebas e2e para search => searcher component
* Pruebas e2e para search => search sorter component
* Pruebas e2e para search => search scroll (infinite)
* Pruebas e2e para film-page

### feat/film-return
* Creación de botón "volver" en páginas de películas
* Creación de botón "goToTop" en listados de películas

### feat/a11y
* Trabajando accesibilidad en el header
* Trabajando accesibilidad necesaria en cada una de las páginas

### seo
* Implementación de buenas prácticas de SEO
* MetaTags en home, search, upcoming, now-playing y film

### refactor/cleanup
* Añadiendo comentarios extra al código
* Limpiando y refactorizando

### feat/footer
* Creación del component footer
* Diseño y adaptación responsive

### feat/now-playing
* Creación del servicio now-playing-films-service
* Creación del componente now-playing
* Refactorizando el código para reutilizar film-list y film-card components
* Scroll infinito

### feat/upcoming
* Creación del servicio upcoming-films-service
* Creación de la página upcoming
* Creación del componente upcoming-list

### feat/navbar
* Añdiendo páginas al navbar
* Estilizando diseño responsive
* Estilos para isOpen, isCollapsed, resize, scroll...

### feat/search-sorter
* Creación del componente search-sorter
* Creación de la función de ordenación por año, votos y popularidad
* Interacción con el listado y arreglando algunos bugs

### feat/searchbyname
* Creando search-by-name-service
* Generando funcionalidades en search-state-service
* Trabajando la interación entre buscar por nombre o por filtros
* Scroll infinito
* Búsqueda por nombre a través de url desde otros lugares (home, film)

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