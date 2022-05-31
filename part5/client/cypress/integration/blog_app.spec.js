describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function () {
        cy.get("#username")
        cy.get("#password")
        cy.get("#login-button")
    })

    describe("Login", function () {
        const username = "teppo1"
        const password = "kissa123"
        beforeEach(function () {
            cy.newUser({ username, password })
        })
        it("succeeds with correct credentials", function () {
            cy.get("#username").type(username)
            cy.get("#password").type(password)
            cy.get("#login-button").click()

            cy.contains("Logged in")
            cy.contains("Log out")
        })

        it("fails with wrong credentials", function () {
            cy.get("#username").type(username)
            cy.get("#password").type("wrong")
            cy.get("#login-button").click()

            cy.contains("wrong username or password")
        })
    })

    describe("When logged in", function () {

        beforeEach(function () {
            const username = "teppo1"
            const password = "kissa123"
            cy.newUser({ username, password })
            cy.login({ username, password })
        })

        it.only("A blog can be created", function () {
            // open blog form
            cy.get("#open-togglable").click()

            // type blog info
            const title = "this is title"
            cy.get("#title-input").type(title)
            cy.get("#author-input").type("Juha Kuusi")
            cy.get("#url-input").type("www.fi")
            cy.get("#submit-button").click()

            // check blog visibility
            cy.get(".blog")
            cy.contains(`New blog ${title} created`)
            cy.contains(title)
        })
    })

})