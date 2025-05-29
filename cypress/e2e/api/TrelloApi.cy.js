describe('Trello API Tests', () => {
    const baseUrl = 'https://api.trello.com';
    const trelloKey = Cypress.env('secretKey');
    const trelloToken = Cypress.env('apiToken');

    console.log('Key:', Cypress.env('secretKey'));
    console.log('Token:', Cypress.env('apiToken'));

    it('should fetch boards', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/1/members/me/boards`,
            qs: {
                key: trelloKey,
                token: trelloToken
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(board => {
                expect(board).to.have.property('id');
                expect(board).to.have.property('name');
            });
        });

    });

});
