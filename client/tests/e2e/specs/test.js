// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Flight Data')
  })
})

describe('Arrivals', () => {
  it('Visits the Arrivals url', () => {
    cy.visit('/arrivals')
    cy.contains('h1', 'Arrivals')
  })
})



describe('Departures', () => {
  it('Visits the Departures url', () => {
    cy.visit('/departures')
    cy.contains('h1', 'Departures')
  })
})
