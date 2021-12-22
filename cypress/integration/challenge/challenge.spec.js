/// <reference types="cypress" />
describe("Challenge Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("standard_user");
  });
  afterEach(() => {
    cy.logout();
  });
  // TODO:
  it("Add Item to cart", () => {});
  // TODO:
  it("Should Place an Order", () => {});
});
