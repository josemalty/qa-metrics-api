describe("UC01 - API USER", function () {
    it("UC01.01 - GET USERS", function () {
        console.log("INICIOU OS TESTES");
        cy.request({
            method: "GET",
            url: Cypress.env("api") + "users",
            headers: {},
        }).then((response) => {
            const wantedUsers = [
                {
                    id: 1,
                    name: "José Cypress Teste",
                    email: "jooteste@gmail.com",
                    password: "teste123",
                },
                {
                    id: 2,
                    name: "José Cypress Teste",
                    email: "jooteste@gmail.com",
                    password: "teste123",
                },
                {
                    id: 3,
                    name: "José Cypress Teste",
                    email: "jooteste@gmail.com",
                    password: "teste123",
                },
                {
                    id: 4,
                    name: "José Cypress Teste",
                    email: "jooteste@gmail.com",
                    password: "teste123",
                },
                {
                    id: 5,
                    name: "José Cypress Teste",
                    email: "jooteste@gmail.com",
                    password: "teste123",
                },
                {
                    id: 6,
                    name: "José Cypress Teste",
                    email: "jooteste@gmail.com",
                    password: "teste123",
                },
                {
                    id: 7,
                    name: "José Cypress Teste",
                    email: "jooteste@gmail.com",
                    password: "teste123",
                },
                {
                    id: 8,
                    name: "José Cypress Teste",
                    email: "jooteste@gmail.com",
                    password: "teste123",
                },
                {
                    id: 9,
                    name: "José Cypress Teste",
                    email: "jooteste@gmail.com",
                    password: "teste123",
                },
            ];
            expect(response.status).to.equal(200);
            const users = response.body;
            Cypress.env("responseUserId", users.id);
            expect(users).to.not.equal(undefined);
            expect(users).to.not.equal(null);
            cy.writeFile("cypress/json/wantedUsers.json", users);
            expect(users[0].name).to.equal(wantedUsers[0].name);
            expect(users[0].email).to.equal(wantedUsers[0].email);
            expect(users[0].body).to.equal(wantedUsers[0].body);
            expect(users[1].name).to.equal(wantedUsers[1].name);
            expect(users[1].email).to.equal(wantedUsers[1].email);
            expect(users[1].body).to.equal(wantedUsers[1].body);
            expect(users[2].name).to.equal(wantedUsers[2].name);
            expect(users[2].email).to.equal(wantedUsers[2].email);
            expect(users[2].body).to.equal(wantedUsers[2].body);
            expect(users[3].name).to.equal(wantedUsers[3].name);
            expect(users[3].email).to.equal(wantedUsers[3].email);
            expect(users[3].body).to.equal(wantedUsers[3].body);
            expect(users[4].name).to.equal(wantedUsers[4].name);
            expect(users[4].email).to.equal(wantedUsers[4].email);
            expect(users[4].body).to.equal(wantedUsers[4].body);
        });
    });
    it("UC01.02 - POST USER", function () {
        const body = {
            name: "José Cypress Teste",
            email: "jooteste@gmail.com",
            password: "teste123",
        };

        cy.request({
            method: "POST",
            url: Cypress.env("api") + "users",
            body: body,
            headers: {},
        }).then((response) => {
            const wantedPostUser = {
                name: "José Cypress Teste",
                email: "jooteste@gmail.com",
                password: "teste123",
            };
            expect(response.status).to.equal(201);
            const postUser = response.body;
            Cypress.env("responseUserId", postUser.id);
            expect(postUser).to.not.equal(undefined);
            expect(postUser).to.not.equal(null);
            cy.writeFile("cypress/json/wantedPostUser.json", postUser);
            expect(postUser.name).to.equal(wantedPostUser.name);
            expect(postUser.email).to.equal(wantedPostUser.email);
            expect(postUser.body).to.equal(wantedPostUser.body);
        });
    });
    it("UC01.03 - GET USER BY ID", function () {
        cy.request({
            method: "GET",
            url: Cypress.env("api") + "users/" + Cypress.env("responseUserId"),
            headers: {},
        }).then((response) => {
            const wantedUser = {
                name: "José Cypress Teste",
                email: "jooteste@gmail.com",
                password: "teste123",
            };
            expect(response.status).to.equal(200);
            const user = response.body;
            expect(user).to.not.equal(undefined);
            expect(user).to.not.equal(null);
            cy.writeFile("cypress/json/wantedUser.json", user);
            expect(user.name).to.equal(wantedUser.name);
            expect(user.email).to.equal(wantedUser.email);
            expect(user.body).to.equal(wantedUser.body);
        });
    });
    it("UC01.04 - PUT USER", function () {
        const body = {
            name: "João dos testes",
            email: "testerJohn@gmail.com",
            password: "password123",
        };

        cy.request({
            method: "PUT",
            url: Cypress.env("api") + "users/" + Cypress.env("responseUserId"),
            body: body,
            headers: {},
            failOnStatusCode: false,
        }).then((response) => {
            const wantedPutUser = {
                name: "João dos testes",
                email: "testerJohn@gmail.com",
                password: "password123",
            };
            expect(response.status).to.equal(200);
            const putUser = response.body;
            expect(putUser).to.not.equal(undefined);
            expect(putUser).to.not.equal(null);
            cy.writeFile("cypress/json/wantedPutUser.json", putUser);
            expect(putUser.name).to.equal(wantedPutUser.name);
            expect(putUser.email).to.equal(wantedPutUser.email);
        });
    });
    it("UC01.05 - GET UDPATED USER", function () {
        cy.request({
            method: "GET",
            url: Cypress.env("api") + "users/" + Cypress.env("responseUserId"),
            headers: {},
            failOnStatusCode: false,
        }).then((response) => {
            const wantedUser = {
                name: "João dos testes",
                email: "testerJohn@gmail.com",
                password: "password123",
            };
            expect(response.status).to.equal(200);
            const user = response.body;
            expect(user).to.not.equal(undefined);
            expect(user).to.not.equal(null);
            cy.writeFile("cypress/json/wantedUser.json", user);
            expect(user.name).to.equal(wantedUser.name);
            expect(user.email).to.equal(wantedUser.email);
            expect(user.body).to.equal(wantedUser.body);
        });
    });
    it("UC01.06 - DELETE USER", function () {
        cy.request({
            method: "DELETE",
            url: Cypress.env("api") + "users/" + Cypress.env("responseUserId"),
            headers: {},
        }).then((response) => {
            console.log(response);
            expect(response.status).to.equal(204);
        });
    });
});
