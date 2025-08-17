const filmIdToTest = '27205'; //Origen
const filmTitleToTest = 'Origen';

describe('Film Page', () => {
    beforeEach(() => {
        cy.visit(`/film/${filmIdToTest}`);
    });

    // Initial state of Film Page

    it('Should show show correct title', () => {
        cy.url().should('eq', `${window.location.origin}/film/${filmIdToTest}`);
        cy.get('.filmData__title').should('contain', filmTitleToTest);
    });

    // Si veníamos de un sitio externo, el botón de volver debe llevarnos a /search
    it('Should return to /search page', () => {
        cy.url().should('eq', `${window.location.origin}/film/${filmIdToTest}`);
        cy.get('.filmData__returnButton').click();
        cy.url().should('eq', `${window.location.origin}/search`);
    });

    // Si pulsamos el botón de "Ver vídeos" debe aparecer el modal
    it('Should return to /search page', () => {

        cy.get('#film-page_watch-videos-button').click();
        cy.get('app-film-videos-modal').should('be.visible');

        cy.get('.closeButton').click();
        cy.get('app-film-videos-modal').should('not.exist');
    });

    // Debemos poder buscar otra película
    it('Should be able to search a film by name', () => {

        cy.get('#film-page_search-input').type('Otra película');
        cy.get('#film-page_search-button').click();
        
        cy.url().should('eq', `${window.location.origin}/search`);
        
    });


});