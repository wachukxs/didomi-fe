describe('Changing preference for existing account', () => {
  beforeEach(() => {
    // alias the user fixture
    cy.fixture('example.json').as('user');
  });

  beforeEach(function() {
    cy.visit('/');

    cy.get('a[href="/signup"] > span.mat-button-wrapper:first-child()').click();
    // or straight up visit /signup

    this.user.email = Math.floor(Math.random() * 500).toString() + this.user.email;

    cy.get('input[type="email"]').type(this.user.email);
    cy.get('label[for="accepttermsandconditions-input"]').click();
    cy.get('button[type="submit"]').click();
  });

  it('Login successfully, and can change preference', function() {
    cy.get('a[href="/login"] > span.mat-button-wrapper:first-child()').click(); // cy.contains('Login').click()

    cy.get('input[type="email"]').type(this.user.email); // use an email that already exists
    cy.contains('Log in').click();

    cy.get('h1.mat-h1').contains('Preference Center');

    cy.get('label[for="sms-checkbox-input"]').click();

    cy.get('simple-snack-bar').contains('Preference updated.');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'DidomiFe');

    
  });
});
