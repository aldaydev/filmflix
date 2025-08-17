describe('Search Page - searcher component', () => {

    beforeEach(() => {
        cy.visit('/search');
    });

    // Initial state of searcher component

    it('Should show search page / resume must be "Viendo listado completo" / options must be invisble', () => {
        cy.url().should('eq', `${window.location.origin}/search`);
        cy.get('.searcher__resume').should('contain', 'Viendo listado completo');
        cy.get('.searcher__options').should('not.be.visible');
    });

    // Search by name function

    it('Should expand searcher component when clicking it', () => {
        
        const filmToSearch = 'Origen';

        // Se expande el componente al hacer click
        cy.get('.searcher__expander').click();
        cy.get('.searcher__options').should('be.visible');

        // Buscamos por nombre
        cy.get('#search-page_search-by-title-input').type(filmToSearch);
        cy.get('#search-page_search-by-title-button').click();
        
        // Se contrae el componente al buscar
        cy.get('.searcher__options').should('not.be.visible');

        // Se actualiza el resume del componente
        cy.get('.searcher__resume').should('contain', `Nombre: ${filmToSearch}`);
        
    });

    // Search by filters

    it('Should expand searcher component when clicking it', () => {
        
        const yearToSearch = '2009';
        const genreToSearch = 'Acción';

        // Se expande el componente al hacer click
        cy.get('.searcher__expander').click();
        cy.get('.searcher__options').should('be.visible');

        // Buscamos por género
        cy.get('label.genresFilter__genreContainer').contains('span.genresFilter__genreName', genreToSearch).click();

        // Buscamos por año
        cy.get('#search-page_search-by-year-input').type(yearToSearch);

        // Hacemos click para buscar
        cy.get('#search-page_search-by-filters-button').click();
        
        // Se contrae el componente al buscar
        cy.get('.searcher__options').should('not.be.visible');

        // Se actualiza el resume del componente
        cy.get('.searcher__resume').should('contain', `Género: ${genreToSearch}`);
        cy.get('.searcher__resume').should('contain', `Año: ${yearToSearch}`);
        
    });
});