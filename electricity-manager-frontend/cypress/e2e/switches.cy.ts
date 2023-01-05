describe('Switches', function () {
  beforeEach(function () {
    cy.visit('/');
    // cy.request('POST', 'http://localhost:3001/api/testingReset');
  });
  it('switch form can be opened and closed', function () {
    cy.contains('Create').click();
    cy.contains('Cancel').click();
  });
  it('new switch can be created', function () {
    // reset database
    cy.request('POST', 'http://localhost:3001/api/testingReset');

    // open switch form and type switch name and choose high limit
    cy.contains('Create').click();
    cy.get('#switchName').type('Test switch');
    cy.get('#highLimit').parent().click();
    cy.findByRole('option', { name: '0' }).click();

    // submit form and check that switch is created
    cy.get('#create-switch').click();
    cy.contains('Switch created successfully!');
    cy.contains('Test switch');
    // check that switch is off because high limit is 0
    cy.contains('th', 'Test switch').siblings().contains('td', 'OFF');
  });
  it('switch can be edited', function () {
    // open switch form and type switch name and choose high limit
    cy.contains('th', 'Test switch')
      .siblings()
      .contains('td', 'OFF')
      .siblings()
      .get('#edit')
      .click();
    cy.get('#switchName').clear().type('Test switch 2');
    cy.get('#highLimit').parent().click();
    cy.findByRole('option', { name: '100' }).click();
    // submit form and check that switch has right values
    cy.get('#create-switch').click();
    cy.contains('Switch edited successfully!');
    cy.contains('Test switch');
    // check that switch is on because high limit is 100
    cy.contains('th', 'Test switch 2').siblings().contains('td', 'ON');
  });

  it('switch can be deleted', function () {
    // delete switch
    cy.contains('th', 'Test switch 2').siblings().get('#delete').click();
    // revert deletion
    cy.get('#alert-close').click();
    cy.contains('th', 'Test switch 2').siblings().contains('td', 'ON');
    // delete switch again and confirm deletion
    cy.contains('th', 'Test switch 2').siblings().get('#delete').click();
    cy.get('#alert-confirm').click();
    cy.contains('Switch deleted successfully!');
    cy.contains('Test switch 2').should('not.exist');
  });
});
