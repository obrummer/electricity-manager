import * as dayjs from 'dayjs';

const today = dayjs.default().format('DD.MM.YYYY');
const yesterday = dayjs.default().subtract(1, 'day').format('DD.MM.YYYY');
const tomorrow = dayjs.default().add(1, 'day').format('DD.MM.YYYY');

describe('Price chart ', function () {
  beforeEach(function () {
    cy.visit('/');
  });
  it('chart component is opened', function () {
    cy.contains('Electricity price');
  });
  it('chart date is today by default', function () {
    cy.contains(today);
  });
  it('chart date is yesterday if clicked -1', function () {
    cy.get('#toggle-reduce-day').click();
    cy.contains(yesterday);
  });
  it('chart date is tomorrow if clicked +1', function () {
    // price data for tomorrow is not available yet so we need to check if the button is disabled or not
    // price data arrives usually at 15:00 finnish time
    cy.get('#toggle-add-day').then((x) => {
      if (x.is('disabled')) {
        cy.get('#toggle-add-day').should('be.disabled');
      } else {
        cy.get('#toggle-add-day').click();
        cy.contains(tomorrow);
      }
    });
  });
  it('price -dataline is visible by default', function () {
    cy.get('#price-line').should('be.visible');
  });

  it('price with tax -dataline is not visible by default', function () {
    cy.get('#toggle-tax').should('not.be.checked');
  });
  it('price with tax -dataline is visible if clicked', function () {
    cy.get('#toggle-tax').check();
    cy.get('#price-with-tax-line').should('be.visible');
  });
  it('reference line is visible if date is today and not visible for yesterdays data', function () {
    cy.get('#reference-line').should('be.visible');
    cy.get('#toggle-reduce-day').click();
    cy.get('#reference-line').should('not.exist');
  });
});
