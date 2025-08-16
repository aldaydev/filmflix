describe('Página de inicio', () => {
    it('debe mostrar el título correcto', () => {
        cy.visit('/');
        cy.contains('Todas tus películas favoritas presentes y futuras');
    });
});