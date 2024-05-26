import { sauceSelectors } from "../../fixtures/pageSelectors"
export class standardUser {

    static loginFlow() {
        cy.visit("/");
        cy.get(sauceSelectors.loginLogo).contains("Swag Labs");
        cy.get(sauceSelectors.username).click().type(Cypress.env('standardUser'));
        cy.get(sauceSelectors.password).click().type(Cypress.env('password'));
        cy.get(sauceSelectors.loginBtn).click();
        cy.url().should('include', '/inventory.html');
        cy.get(sauceSelectors.backPack).should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
    }

    static viewIndividualProduct() {
        cy.get(sauceSelectors.viewProduct).click();
        cy.get(sauceSelectors.backPackItem).should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
        cy.get(sauceSelectors.addtoCart).click();
        cy.get(sauceSelectors.cartValue).should('have.text', '1');
        cy.get(sauceSelectors.removefromCart).click();
        cy.get(sauceSelectors.backToProductsBtn).click();
    }

    static sortProductsbyPrice() {
        const expectedSortedOrder = 
        ['Sauce Labs Onesie', 
        'Sauce Labs Bike Light', 
        'Sauce Labs Bolt T-Shirt', 
        'Test.allTheThings() T-Shirt (Red)', 
        'Sauce Labs Backpack', 
        'Sauce Labs Fleece Jacket'];
        cy.get(sauceSelectors.sortBtn).select('Price (low to high)');
        cy.get(sauceSelectors.inventoryList).then(($items) => {
        const actualSortedOrder = [...$items].map(item => {
            const productName = item.querySelector(sauceSelectors.inventoryItems).textContent.trim();
        return productName;
      });
        expect(actualSortedOrder).to.deep.equal(expectedSortedOrder);
        });
}

    static sortProductsbyName() {
        const expectedSortedOrder = 
        ['Test.allTheThings() T-Shirt (Red)', 
        'Sauce Labs Onesie', 
        'Sauce Labs Fleece Jacket', 
        'Sauce Labs Bolt T-Shirt', 
        'Sauce Labs Bike Light', 
        'Sauce Labs Backpack']
        cy.get(sauceSelectors.sortBtn).select('Name (Z to A)');
        cy.get(sauceSelectors.inventoryList).then(($items) => {
        const actualSortedOrder = [...$items].map(item => {
            const productName = item.querySelector(sauceSelectors.inventoryItems).textContent.trim();
        return productName;
      });
        expect(actualSortedOrder).to.deep.equal(expectedSortedOrder);
        });
    }

    static cart() {
        cy.get(sauceSelectors.addRedShirttoCart).click();
        cy.get(sauceSelectors.addOnesietoCart).click();
        cy.get(sauceSelectors.cartValue).should('have.text', '2');
        cy.get(sauceSelectors.goToCart).click();
        cy.url().should('include', '/cart.html');
        cy.get(sauceSelectors.continueShoppingBtn).click();
        cy.get(sauceSelectors.addBackParttoCart).click();
    }

    static checkout() {
        const expectedText = 'Thank you for your order!';

        cy.get(sauceSelectors.goToCart).click();
        cy.get(sauceSelectors.checkoutBtn).click();
        cy.get(sauceSelectors.firstName).type('Tega');
        cy.get(sauceSelectors.lastName).type('Michael');
        cy.get(sauceSelectors.postalCode).type('1234');
        cy.get(sauceSelectors.continueBtn).click();
        cy.url().should('include', '/checkout-step-two.html');
        cy.get(sauceSelectors.finishBtn).click();
        cy.get(sauceSelectors.successfulMessage).should('have.text', (expectedText));
    }
}
