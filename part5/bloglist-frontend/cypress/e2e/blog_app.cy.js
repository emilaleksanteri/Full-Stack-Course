describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const tempUser = {
      username: 'emilTest',
      name: 'Emil Lystimaki',
      password: '2tr@ongPasswrd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', tempUser) // add user for testing into db

    cy.visit('http://localhost:3000')
  })
  it('login form shown by default', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-btn')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('emilTest')
      cy.get('#password').type('2tr@ongPasswrd')
      cy.get('#login-btn').click()

      cy.get('#notification')
        .should('contain', 'welcome Emil Lystimaki')
        .and('have.css', 'color', 'rgb(0, 128, 0)') // green notification
        .and('have.css', 'border', '2.4px solid rgb(0, 128, 0)') // weird solid border due to react style

      cy.contains('Emil Lystimaki logged in')
      cy.contains('logout')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('emilTest')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-btn').click()

      cy.get('#error')
        .should('contain', 'wrong username or password') // error notification
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border', '2.4px solid rgb(255, 0, 0)')

      cy.get('#login-btn')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'emilTest', password: '2tr@ongPasswrd' })
      cy.postBlog({ title: 'Cypress Testing', author: 'Test', url: 'noUrl', likes: '0' })
    })
    it('a blog can be created', function() {
      cy.contains('new blog').click() // open blog form

      cy.get('#title').type('Introduction to Cypress') // below block contains blog to post details
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#What-you-ll-learn')
      cy.get('#postBlog-btn').click()
    })
    it('usesr can like a blog', function() {
      cy.contains('Cypress Testing | Test') // open all info containing likes
        .contains('view')
        .click()

      cy.contains('Cypress Testing | Test') // click like btn
        .get('#likesField')
        .contains('0')
        .contains('like')
        .click()

      cy.contains('Cypress Testing | Test') // check that likes went from 0 to 1
        .get('#likesField')
        .contains('1')
    })
    it('user who created blog can delete it', function() {
      cy.contains('Cypress Testing | Test') // open all info containing remove
        .contains('view')
        .click()

      cy.contains('Cypress Testing | Test') // remove blog post
        .get('#removePost')
        .click()

      cy.get('html') // check that blog no longer exists
        .should('not.contain', 'Cypress Testing | Test')
    })
    it('user !== blog owner, unable to remove blog', function() {
      cy.contains('logout').click() // logout

      cy.contains('Cypress Testing | Test')
        .contains('view')
        .click()

      cy.get('.expanded') // get all btns in element
        .find('button')
        .as('elementBtns')

      cy.get('@elementBtns') // all buttons do not contain remove
        .should('not.contain', 'remove')
    })
  })
  describe('blog like ranking', function() {
    beforeEach(function() {
      cy.login({ username: 'emilTest', password: '2tr@ongPasswrd' })
      cy.postBlog({ title: 'Cypress Testing 1', author: 'Test', url: 'noUrl', likes: '1' })
      cy.postBlog({ title: 'Cypress Testing 2', author: 'Test', url: 'noUrl', likes: '2' })
      cy.postBlog({ title: 'Cypress Testing 3', author: 'Test', url: 'noUrl', likes: '3' })
    })
    it.only('blogs displayed from most liked to least liked', function() {
      // open all blogs to full view
      cy.contains('Cypress Testing 1 | Test')
        .contains('view')
        .click()
      cy.contains('Cypress Testing 2 | Test')
        .contains('view')
        .click()
      cy.contains('Cypress Testing 3 | Test')
        .contains('view')
        .click()

      cy.get('.individualBlog').eq(0).should('contain', 'Cypress Testing 3') // most likes 1st
      cy.get('.individualBlog').eq(2).should('contain', 'Cypress Testing 1') // least likes last

      // like blog 2nd twice to give it most likes
      cy.get('.individualBlog')
        .eq(1)
        .contains('like')
        .click()

      cy.get('.individualBlog')
        .eq(1)
        .contains('like')
        .click()

      cy.get('.individualBlog').eq(0).should('contain', 'Cypress Testing 2') // previous 2nd blog becomes 1st
    })
  })
})