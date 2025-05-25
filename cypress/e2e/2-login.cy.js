import {onLoginPage} from "../support/page_objects/loginPage";

describe('Validate the onboarding process', () => {
    it('should be logged in and create bank account', () => {
        cy.goToLoginPage();
        onLoginPage.enterUsernameToLogin();
        onLoginPage.enterPasswordToLogin();
        onLoginPage.clickOnSignIn();

        cy.get('body').then(($body) => {
            if ($body.find('[data-test="user-onboarding-dialog-title"]').length > 0) {
                cy.get('[data-test="user-onboarding-dialog-title"]', { timeout: 5000 })
                    .should('be.visible')
                    .then(($el) => {
                        cy.log(`Dialog Title Found: "${$el.text()}"`);
                        onLoginPage.enterBankName();
                        onLoginPage.enterRoutingNumber();
                        onLoginPage.enterAccountNumber();
                        onLoginPage.clickOnSaveBankAccount();
                    });
            } else {
                cy.log('Bank account already created, skipping dialog...');
            }
        });

        onLoginPage.validateOnHomePage();
    });

});