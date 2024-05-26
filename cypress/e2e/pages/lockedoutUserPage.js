import { sauceSelectors, signIn } from "../../fixtures/pageSelectors"
export class lockedoutUser {

    static loginFlow() {
        const errorText = 'Epic sadface: Sorry, this user has been locked out.'

        cy.clearCookies();
        cy.visit("/");
        cy.get(sauceSelectors.loginLogo).contains("Swag Labs");
        cy.get(sauceSelectors.username).click().type(Cypress.env('lockedoutUser'));
        cy.get(sauceSelectors.password).click().type(Cypress.env('password'));
        cy.get(sauceSelectors.loginBtn).click();
        cy.url().should('not.include', '/inventory.html');
        cy.get(sauceSelectors.errormessage).should('have.text', (errorText));
    }
}