describe('Home Page', () => {
    it('Visits the initial project page', () => {
        cy.visit('/');
        cy.contains('Todas tus películas favoritas presentes y futuras');
    });
});
