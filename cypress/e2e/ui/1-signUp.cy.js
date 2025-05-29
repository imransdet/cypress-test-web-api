import {onLoginPage} from "../../support/page_objects/loginPage";

describe('Validate the signup process', () => {

    it('should fill out the signup form and submit', () => {
        cy.goToLoginPage();
        onLoginPage.clickOnDontHaveAccount();
        onLoginPage.enterFirstName();
        onLoginPage.enterLastName();
        onLoginPage.enterUsername();
        onLoginPage.enterPassword();
        onLoginPage.enterConfirmPassword();
        onLoginPage.clickOnSignUp();
    });
});