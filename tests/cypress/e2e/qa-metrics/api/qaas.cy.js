describe("UC01 - API QAAS", function () {
    let postId = null;
    it("UC01.01 - POST SERVICE", function () {
        const body = {
            name: "Testes de Interface",
            description:
                "O teste de interface do usuário (UI) serve para garantir que todos os itens de uma tela funcionem adequadamente, analisando a interação de um aplicativo, site ou programa com o usuário final.",
        };
        cy.request({
            method: "POST",
            url: Cypress.env("api") + "qaas",
            body: body,
            headers: {},
        }).then((response) => {
            const wantedPostService = {
                name: "Testes de Interface",
                description:
                    "O teste de interface do usuário (UI) serve para garantir que todos os itens de uma tela funcionem adequadamente, analisando a interação de um aplicativo, site ou programa com o usuário final.",
            };
            expect(response.status).to.equal(201);
            const postService = response.body;
            postId = postService.id;
            expect(postService).to.not.equal(undefined);
            expect(postService).to.not.equal(null);
            cy.writeFile("cypress/json/wantedPostService.json", postService);
            expect(postService.name).to.equal(wantedPostService.name);
            expect(postService.description).to.equal(wantedPostService.description);
        });
    });
    it("UC01.02 - GET SERVICES", function () {
        cy.request({
            method: "GET",
            url: Cypress.env("api") + "qaas",
            headers: {},
        }).then((response) => {
            const wantedQaas = [
                {
                    id: 1,
                    name: "Automação de Testes Web",
                    description:
                        "Todos sabemos que não é fácil desenvolver uma aplicação, isso demanda muita tempo e dedicação, certo? Para evitar retrabalho e garantir que o produto entregue será líder em qualidade nós temos a solução para te ajudar: A Automação de Testes",
                },
                {
                    id: 2,
                    name: "Testes de Interface",
                    description:
                        "O teste de interface do usuário (UI) serve para garantir que todos os itens de uma tela funcionem adequadamente, analisando a interação de um aplicativo, site ou programa com o usuário final.",
                },
            ];
            expect(response.status).to.equal(200);
            const qaas = response.body;
            Cypress.env("responseUserId", qaas.id);
            expect(qaas).to.not.equal(undefined);
            expect(qaas).to.not.equal(null);
            cy.writeFile("cypress/json/wantedQaas.json", qaas);
            expect(qaas[0].name).to.equal(wantedQaas[0].name);
            expect(qaas[0].description).to.equal(wantedQaas[0].description);
        });
    });
    it("UC01.03 - GET SERVICE BY ID", function () {
        cy.request({
            method: "GET",
            url: Cypress.env("api") + "qaas/" + postId,
            headers: {},
        }).then((response) => {
            const wantedQaas = {
                name: "Testes de Interface",
                description:
                    "O teste de interface do usuário (UI) serve para garantir que todos os itens de uma tela funcionem adequadamente, analisando a interação de um aplicativo, site ou programa com o usuário final.",
            };
            expect(response.status).to.equal(200);
            const qaas = response.body;
            console.log({ qaas });
            console.log({ wantedQaas });
            expect(qaas).to.not.equal(undefined);
            expect(qaas).to.not.equal(null);
            cy.writeFile("cypress/json/wantedQaas.json", qaas);
            expect(qaas.name).to.equal(wantedQaas.name);
            expect(qaas.description).to.equal(wantedQaas.description);
        });
    });
    it("UC01.04 - PUT SERVICE", function () {
        const body = {
            name: "Testes de Interface EDIÇÃO",
            description:
                "O teste de interface do usuário (UI) serve para garantir que todos os itens de uma tela funcionem adequadamente, analisando a interação de um aplicativo, site ou programa com o usuário final.",
        };

        cy.request({
            method: "PUT",
            url: Cypress.env("api") + "qaas/" + postId,
            body: body,
            headers: {},
            failOnStatusCode: false,
        }).then((response) => {
            const wantedPutQaas = {
                name: "Testes de Interface EDIÇÃO",
                description:
                    "O teste de interface do usuário (UI) serve para garantir que todos os itens de uma tela funcionem adequadamente, analisando a interação de um aplicativo, site ou programa com o usuário final.",
            };
            expect(response.status).to.equal(200);
            const putQaas = response.body;
            expect(putQaas).to.not.equal(undefined);
            expect(putQaas).to.not.equal(null);
            cy.writeFile("cypress/json/wantedPutQaas.json", putQaas);
            expect(putQaas.name).to.equal(wantedPutQaas.name);
            expect(putQaas.description).to.equal(wantedPutQaas.description);
        });
    });
    it("UC01.05 - GET UDPATED SERVICE", function () {
        cy.request({
            method: "GET",
            url: Cypress.env("api") + "qaas/" + postId,
            headers: {},
            failOnStatusCode: false,
        }).then((response) => {
            const wantedQaas = {
                name: "Testes de Interface EDIÇÃO",
                description:
                    "O teste de interface do usuário (UI) serve para garantir que todos os itens de uma tela funcionem adequadamente, analisando a interação de um aplicativo, site ou programa com o usuário final.",
            };
            expect(response.status).to.equal(200);
            const user = response.body;
            expect(user).to.not.equal(undefined);
            expect(user).to.not.equal(null);
            cy.writeFile("cypress/json/wantedQaas.json", user);
            expect(user.name).to.equal(wantedQaas.name);
            expect(user.description).to.equal(wantedQaas.description);
        });
    });
    it("UC01.06 - DELETE SERVICE", function () {
        cy.request({
            method: "DELETE",
            url: Cypress.env("api") + "qaas/" + postId,
            headers: {},
        }).then((response) => {
            console.log(response);
            expect(response.status).to.equal(204);
        });
    });
});
