import { sauceSelectors } from "../../fixtures/pageSelectors"
export class problemUser {

    static loginFlow() {
        cy.visit("/");
        cy.get(sauceSelectors.loginLogo).contains("Swag Labs");
        cy.get(sauceSelectors.username).click().type(Cypress.env('problemUser'));
        cy.get(sauceSelectors.password).click().type(Cypress.env('password'));
        cy.get(sauceSelectors.loginBtn).click();
        cy.url().should('include', '/inventory.html');
        cy.get(sauceSelectors.backPack).should('not.have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg'); //asserting the image is incorrect
    }

    static viewIndividualProduct() {
        cy.get(sauceSelectors.viewProduct).click();
        cy.get(sauceSelectors.inventoryItems).should('not.have', 'Sauce Labs Backpack',); //asserting the item name
        cy.get(sauceSelectors.addtoCart).click();
        cy.get(sauceSelectors.cartValue).should('not.have', '1');
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
        expect(actualSortedOrder).not.to.deep.equal(expectedSortedOrder);
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
        expect(actualSortedOrder).not.to.deep.equal(expectedSortedOrder); //asserting sorting fails based on the user type
        });
    }

    static cart() {
        cy.get(sauceSelectors.addRedShirttoCart).click();
        cy.get(sauceSelectors.addOnesietoCart).click();
        cy.get(sauceSelectors.cartValue).should('have.text', '1');
        cy.get(sauceSelectors.goToCart).click();
        cy.url().should('include', '/cart.html');
        cy.get(sauceSelectors.continueShoppingBtn).click();
        cy.get(sauceSelectors.addBackParttoCart).click();
    }

    static checkout() {
        const errorMessage = 'Error: Last Name is required';

        cy.get(sauceSelectors.goToCart).click();
        cy.get(sauceSelectors.checkoutBtn).click();
        cy.get(sauceSelectors.firstName).type('Tega');
        cy.get(sauceSelectors.lastName).type('Michael');
        cy.get(sauceSelectors.postalCode).type('1234');
        cy.get(sauceSelectors.continueBtn).click();
        cy.url().should('not.include', '/checkout-step-two.html');
        cy.get(sauceSelectors.errormessage).should('have.text', (errorMessage)); //asserting checkout cannot be completed based on the user type
    }
}