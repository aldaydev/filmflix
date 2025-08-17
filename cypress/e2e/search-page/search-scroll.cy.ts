describe('Search Page - infinite scroll', () => {

    beforeEach(() => {
        cy.visit('/search');
    });

    it('should load more cards when scrolling to the bottom', () => {
            // Contar las cards iniciales
            cy.get('app-film-card').then(($cards) => {
                const initialCount = $cards.length;

                cy.wait(1000); // darle tiempo a Angular para renderizar

                // Hacer scroll al fondo varias veces
                cy.scrollTo('bottom');
                

                // Comprobar que hay más cards
                cy.get('app-film-card').should('have.length.greaterThan', initialCount);
            });
        });

});