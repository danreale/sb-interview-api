// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import * as loginPage from "../support/pom/loginPage";

Cypress.Commands.add("login", (user) => {
  cy.get(loginPage.username).type(user);
  cy.get(loginPage.password).type("secret_sauce");
  cy.get(loginPage.loginButton).click();
  cy.url().should("contain", "/inventory.html");
});

Cypress.Commands.add("logout", () => {
  cy.get(loginPage.menuButton).click();
  cy.wait(1000);
  cy.get(loginPage.logoutLink).click();
  cy.url().should("not.contain", "/inventory.html");
  cy.url().should("not.contain", "/cart.html");
});
