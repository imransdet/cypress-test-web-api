import { faker } from '@faker-js/faker'

export class LoginPage{
    clickOnDontHaveAccount(){
        cy.get('.MuiGrid-root.MuiGrid-item.css-13i4rnv-MuiGrid-root')
            .click();

        cy.get('.MuiTypography-root.MuiTypography-h5.css-nhtccy-MuiTypography-root')
            .should('have.text', 'Sign Up');
    }

    enterFirstName(){
        cy.get('#firstName-label')
            .should('contain', 'First Name');

        const firstName = faker.person.firstName()
        cy.get('#firstName').type(firstName);
    }

    enterLastName(){
        cy.get('#lastName-label')
            .should('contain', 'Last Name');

        const lastName = faker.person.lastName()
        cy.get('#lastName').type(lastName);
    }

    enterUsername(){
        cy.get('#username-label')
            .should('contain', 'Username');

        const userName = faker.internet.username();
        cy.get('#username').type(userName);

        cy.writeFile('cypress/fixtures/createdUser.json', { username: userName });
    }

    enterPassword() {
        cy.get('#password-label')
            .should('contain', 'Password');

        const password = faker.internet.password();
        cy.get('#password').type(password);

        cy.readFile('cypress/fixtures/createdUser.json')
            .then((userData) => {
                const updatedData = { ...userData, password };
                cy.writeFile('cypress/fixtures/createdUser.json', updatedData);
            });
    }


    enterConfirmPassword() {
        cy.get('#confirmPassword-label')
            .should('contain', 'Confirm Password');

        cy.fixture('createdUser.json').then((user) => {
            cy.get('#confirmPassword').type(user.password);
        });
    }


    clickOnSignUp(){
        cy.get("button[type='submit']")
            .should('contain', 'Sign Up')
            .click();

        cy.get('.MuiGrid-root.MuiGrid-item.css-13i4rnv-MuiGrid-root')
            .should('be.visible');
    }

    enterUsernameToLogin() {
        cy.fixture('createdUser.json').then((userData) => {
            cy.get('#username-label').should('contain', 'Username');
            cy.get('#username').type(userData.username);
        });
    }

    enterPasswordToLogin() {
        cy.fixture('createdUser.json').then((userData) => {
            cy.get('#password-label').should('contain', 'Password');
            cy.get('#password').type(userData.password);
        });
    }

    clickOnSignIn() {
        cy.get("button[type='submit']")
            .should('contain', 'Sign In')
            .click();

        cy.wait(1000);
        cy.get('body').then(($body) => {
            if ($body.find('button[data-test="user-onboarding-next"]').length > 0) {
                cy.get('button[data-test="user-onboarding-next"]', { timeout: 5000 })
                    .should('be.visible')
                    .click();
                cy.wait(1000);
            } else {
                cy.log('Next button not found, continuing...');
            }
        });

    }

    enterBankName() {
        cy.contains('Create Bank Account', { timeout: 3000 });

        cy.get('#bankaccount-bankName-input')
            .should('have.attr', 'placeholder', 'Bank Name');

        const bankName = faker.company.name();
        cy.get('#bankaccount-bankName-input').type(bankName);
        cy.get('#bankaccount-bankName-input').should('have.value', bankName);

    }

    enterRoutingNumber() {
        cy.get('#bankaccount-routingNumber-input')
            .should('have.attr', 'placeholder', 'Routing Number');

        const routingNumber = faker.finance.routingNumber();
        cy.get('#bankaccount-routingNumber-input').type(routingNumber);
        cy.get('#bankaccount-routingNumber-input').should('have.value', routingNumber);
    }

    enterAccountNumber() {
        cy.get('#bankaccount-accountNumber-input')
            .should('have.attr', 'placeholder', 'Account Number');

        const accountNumber = faker.finance.accountNumber(9);
        cy.get('#bankaccount-accountNumber-input').type(accountNumber);
        cy.get('#bankaccount-accountNumber-input').should('have.value', accountNumber);
    }

    clickOnSaveBankAccount() {
        cy.get("button[type='submit']")
            .should('contain', 'Save')
            .click();

        cy.contains('Finished', { timeout: 3000 })
            .should('be.visible');

        cy.contains('Done').click();
    }

    validateOnHomePage() {
        cy.contains('Logout', { timeout: 3000 })
            .should('be.visible');
    }

}

export const onLoginPage = new LoginPage();
