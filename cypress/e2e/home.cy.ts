
function advanceCarousel() {
  cy.get('.filmCarousel__slideButton--right').then($btn => {
    if ($btn.attr('aria-hidden') !== 'true') { // solo clic si no está oculto
      cy.wrap($btn).click();
      advanceCarousel(); // llamada recursiva hasta que el botón desaparezca
    }
  });
}

function backCarousel() {
  cy.get('.filmCarousel__slideButton--left').then($btn => {
    if ($btn.attr('aria-hidden') !== 'true') { // solo clic si no está oculto
      cy.wrap($btn).click();
      backCarousel(); // llamada recursiva hasta que el botón desaparezca
    }
  });
}

describe('Home', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  
  it('Should show homepage', () => {
    cy.url().should('eq', Cypress.config().baseUrl); // raíz
    cy.get('h1.welcome__title').should('be.visible');
  });

  // ---------- SEARCH FILM AT HOME HERO SECTION ----------

  it('should be able to search a film in th hero section(pressing ENTER)', () => {
    const nameToSearch = 'Origen';
    cy.get('#home-page_search-input').type(`${nameToSearch}{enter}`);
    cy.url().should('include', '/search');
    cy.get('span.searcher__resume').should('contain', `Nombre: ${nameToSearch}`);
  });

  it('should be able to search a film in th hero section(CLICK on search button)', () => {
    const nameToSearch = 'Origen';
    cy.get('#home-page_search-input').type(`${nameToSearch}`);
    cy.get('#home-page_search-button').click();
    cy.url().should('include', '/search');
    cy.get('span.searcher__resume').should('contain', `Nombre: ${nameToSearch}`);
  });

  // ---------- GO TO UPCOMING PAGE ----------

  it('should navigate to "/upcoming" by clicking button', () => {
    cy.get('#home-page_whats-new-button').click({ force: true });
    cy.url().should('include', '/upcoming');
  });

  // ---------- USAGE OF CAROUSEL ----------

  it('should be able to slide the carousel to right', () => {
    
    //Al inicio el botón de retroceder está oculto, si avanzamos, se muestra
    cy.get('.filmCarousel__slideButton--left').should('not.be.visible');
    cy.get('.filmCarousel__slideButton--right').click();
    cy.get('.filmCarousel__slideButton--left').should('be.visible');

    //Avanzar carousel hasta el final
    advanceCarousel();
    cy.get('.filmCarousel__slideButton--right').should('not.be.visible');

    //Retroceder hasta el inicio
    backCarousel();
    cy.get('.filmCarousel__slideButton--left').should('not.be.visible');

    // Visitar una de las películas
    cy.get('.filmCarousel__posterContainer')
      .first()
      .then($link => {
        const href = $link.prop('href');
        cy.wrap($link).click();
        cy.url().should('eq', href);
      });
    cy.url().should('include', '/film');
    
  });

  // ---------- FAQ ----------

  it('should expand the first FAQ expander', () => {
    cy.get('.faqExpansor__description').first().should('not.be.visible');
    cy.get('.faqExpansor__titleContainer').first().click();
    cy.get('.faqExpansor__description').first().should('be.visible');
    cy.get('.faqExpansor__titleContainer').first().click();
    cy.get('.faqExpansor__description').first().should('not.be.visible');
  });

});