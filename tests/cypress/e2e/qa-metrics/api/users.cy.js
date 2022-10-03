import {throws} from "balbal";
describe("UC01 - API USER", function () {
    let userId = null;
    
    it("UC01.01 - POST USER", function () {
        cy.wait(2000);
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
            console.log("TesteSonar")
            expect(response.status).to.equal(201);
            const postUser = response.body;
            userId = postUser.id;
            expect(postUser).to.not.equal(undefined);
            expect(postUser).to.not.equal(null);
            cy.writeFile("cypress/json/wantedPostUser.json", postUser);
            expect(postUser.name).to.equal(wantedPostUser.name);
            expect(postUser.email).to.equal(wantedPostUser.email);
            expect(postUser.body).to.equal(wantedPostUser.body);
        });
    });
    it("UC01.02 - GET USERS", function () {
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
            console.log(Cypress.env("responseUserId"));
            expect(users).to.not.equal(undefined);
            expect(users).to.not.equal(null);
            cy.writeFile("cypress/json/wantedUsers.json", users);
            expect(users[0].name).to.equal(wantedUsers[0].name);
            expect(users[0].email).to.equal(wantedUsers[0].email);
    });
    it("UC01.03 - GET USER BY ID", function () {
        cy.wait(2000);
        cy.request({
            method: "GET",
            url: Cypress.env("api") + "users/" + userId.toString(),
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
        cy.wait(2000);
        console.log("CHEGOU NO PUT");
        const body = {
            name: "João dos testes",
            email: "testerJohn@gmail.com",
            password: "password123",
        };

        cy.request({
            method: "PUT",
            url: Cypress.env("api") + "users/" + userId.toString(),
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
        cy.wait(2000);
        console.log("GET UPDATE ", userId.toString());
        cy.request({
            method: "GET",
            url: Cypress.env("api") + "users/" + userId.toString(),
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
        cy.wait(2000);
        console.log(Cypress.env("responseUserId"), "CONSOLE TESTE");
        cy.request({
            method: "DELETE",
            url: Cypress.env("api") + "users/" + userId.toString(),
            headers: {},
        }).then((response) => {
            console.log(response);
            expect(response.status).to.equal(204);
        });
    });
});
