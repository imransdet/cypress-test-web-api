import { faker } from '@faker-js/faker'

export class LoginPage{
    clickOnDontHaveAccount(){
        cy.get('.MuiGrid-root.MuiGrid-item.css-13i4rnv-MuiGrid-root').click();
    }

    enterFirstName(){
        const firstName = faker.person.firstName()
        cy.get('#firstName').type(firstName);
    }
    enterLastName(){
        const lastName = faker.person.lastName()
        cy.get('#lastName').type(lastName);
    }

    enterUsername(){
        const userName = faker.internet.username();
        cy.get('#username').type(userName);
    }

    enterPassword(){
        cy.get('#password').type('Test@0987');
    }

    enterConfirmPassword(){
        cy.get('#confirmPassword').type('Test@0987');
    }

    clickOnSignUp(){
        cy.get('button[type=\'submit\']').click();
    }

}

export const onLoginPage = new LoginPage();
