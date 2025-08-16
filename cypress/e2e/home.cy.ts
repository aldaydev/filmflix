describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('debe mostrar la home', () => {
    cy.url().should('eq', Cypress.config().baseUrl); // raíz
    cy.get('h1.welcome__title').should('be.visible');
  });

  it('puede buscar una película', () => {
    cy.get('app-input .customInput').type('Inception{enter}');
    cy.url().should('include', '/search'); // esperamos /search
  });
});