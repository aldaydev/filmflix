describe('Search Page - searcher component', () => {

    beforeEach(() => {
        cy.visit('/search');
    });

    it('should update the movie list when sorting by votes', () => {
        
        // Guardamos el título de la primera película antes de cambiar el orden
        cy.get('.filmCard').first().find('.filmCard__info h3.filmCard__title').invoke('text').then(firstMovieBefore => {

            // Hacemos click en el botón de ordenar por votos
            cy.get('.sortBy__button').contains('Votos').click({force: true});

            // Comprobamos que el primer h3 cambió
            cy.get('.filmCard').first().find('.filmCard__info h3.filmCard__title').invoke('text').should(firstMovieAfter => {
                expect(firstMovieAfter).not.to.eq(firstMovieBefore);
            });
        });
    });

    it('should update the movie list when sorting by year', () => {
        
        // Guardamos el título de la primera película antes de cambiar el orden
        cy.get('.filmCard').first().find('.filmCard__info h3.filmCard__title').invoke('text').then(firstMovieBefore => {

            // Hacemos click en el botón de ordenar por año
            cy.get('.sortBy__button').contains('Año').click({force: true});

            // Comprobamos que el primer h3 cambió
            cy.get('.filmCard').first().find('.filmCard__info h3.filmCard__title').invoke('text').should(firstMovieAfter => {
                expect(firstMovieAfter).not.to.eq(firstMovieBefore);
            });
        });
    });

    it('should update the movie list when sorting by popularity', () => {
        
        // Guardamos el título de la primera película antes de cambiar el orden
        cy.get('.filmCard').first().find('.filmCard__info h3.filmCard__title').invoke('text').then(firstMovieBefore => {

            // Hacemos click en el botón de ordenar por año
            cy.get('.sortBy__button').contains('Popularidad').click({force: true});

            // Comprobamos que el primer h3 cambió
            cy.get('.filmCard').first().find('.filmCard__info h3.filmCard__title').invoke('text').should(firstMovieAfter => {
                expect(firstMovieAfter).not.to.eq(firstMovieBefore);
            });
        });
    });

    it('should update the movie list when clicking order button (a-z, z-a)', () => {
        
        // Guardamos el título de la primera película antes de cambiar el orden
        cy.get('.filmCard').first().find('.filmCard__info h3.filmCard__title').invoke('text').then(firstMovieBefore => {

            // Hacemos click en el botón de ordenar por año
            cy.get('.sortBy__button').contains('Z-A').click({force: true});

            // Comprobamos que el primer h3 cambió
            cy.get('.filmCard').first().find('.filmCard__info h3.filmCard__title').invoke('text').should(firstMovieAfter => {
                expect(firstMovieAfter).not.to.eq(firstMovieBefore);
            });
        });
    });
});