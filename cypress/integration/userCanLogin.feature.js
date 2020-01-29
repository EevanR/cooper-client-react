/// <reference types="Cypress" />

describe("User can log in", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("successfully", () => {
    cy.route({
      method: "POST",
      url: "https://cooper-api-eevan.herokuapp.com/api/v1/auth/sign_in",
      response: "fixture:login.json",
      headers: {
        uid: "user@mail.com"
      }
    });
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com")
      cy.get("#password").type("password");
      cy.get('button').contains('Submit').click();
    });
    cy.get("#root").should("contain", "Hi user@mail.com");
  });

  it("with invalid credentials", () => {
    cy.route({
      method: "POST",
      url: "https://cooper-api-eevan.herokuapp.com/api/v1/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      }
    });
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("wrongpassword");
      cy.get('button').contains('Submit').click()
    });
    cy.get("#root").should("contain", "Invalid login credentials. Please try again.");
  });
});