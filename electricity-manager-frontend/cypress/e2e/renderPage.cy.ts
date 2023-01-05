describe('Front page ', function () {
  beforeEach(function () {
    cy.visit('/');
  });
  it('front page can be opened', function () {
    cy.contains('Electricity Manager');
  });
  it('right content is visible', function () {
    cy.contains('Switches');
    cy.contains('Current price');
    cy.contains('Average price today');
    cy.contains('Highest price today');
    cy.contains('Lowest price today');
    cy.contains('Electricity price');
  });
});
