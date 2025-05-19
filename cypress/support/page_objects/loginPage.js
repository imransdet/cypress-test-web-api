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
}

export const onLoginPage = new LoginPage();
