import { sauceSelectors } from "../../fixtures/pageSelectors"
export class performanceUser {

    static pageLoad() {
        const minLoadTime = 2000; // individually defined load time
        cy.visit("/");
        cy.get(sauceSelectors.loginLogo).contains("Swag Labs");
        cy.get(sauceSelectors.username).click().type(Cypress.env('performanceglitchUser'));
        cy.get(sauceSelectors.password).click().type(Cypress.env('password'));
        cy.get(sauceSelectors.loginBtn).click();
        const startTime = performance.now();
        cy.url().should('include', '/inventory.html').then(() => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        cy.log('Page Load Time:', loadTime);
        console.log('Page Load Time:', loadTime);
        expect(loadTime).to.be.greaterThan(minLoadTime); // asserting it takes more than 2 seconds to login
    });
    }

    static sortProductsbyPrice() {
        const minActionTime = 2000; // individually defined load time
        const expectedSortedOrder = [
            'Sauce Labs Onesie',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Backpack',
            'Sauce Labs Fleece Jacket'
        ];
        const startTime = performance.now();
    
        cy.get(sauceSelectors.sortBtn).select('Price (low to high)');
        cy.get(sauceSelectors.inventoryList).then(($items) => {
            const actualSortedOrder = [...$items].map(item => {
                const productName = item.querySelector(sauceSelectors.inventoryItems).textContent.trim();
                return productName;
            });
            const endTime = performance.now();
            const actionTime = endTime - startTime;
            expect(actionTime).to.be.greaterThan(minActionTime); // asserting it takes more than 2 seconds to sort
            expect(actualSortedOrder).to.deep.equal(expectedSortedOrder); 
        });
    }
    

    static sortProductsbyName() {
        const minActionTime = 2000; // individually defined load time
        const expectedSortedOrder = [
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Onesie',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Bike Light',
            'Sauce Labs Backpack'
        ];
        const startTime = performance.now();
    
        cy.get(sauceSelectors.sortBtn).select('Name (Z to A)');
        cy.get(sauceSelectors.inventoryList).then(($items) => {
            const actualSortedOrder = [...$items].map(item => {
                const productName = item.querySelector(sauceSelectors.inventoryItems).textContent.trim();
                return productName;
            });
            const endTime = performance.now();
            const actionTime = endTime - startTime;
            expect(actionTime).to.be.greaterThan(minActionTime);
            expect(actualSortedOrder).to.deep.equal(expectedSortedOrder); // asserting it takes more than 2 seconds to sort
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