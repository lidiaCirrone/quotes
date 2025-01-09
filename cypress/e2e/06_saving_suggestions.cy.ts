/* 
  - There is a clickable element somewhere near the suggested quote that allow me to save the quote in my list
  - Clicking them will permanently save the quote in my list
*/

describe("Save suggested quote", () => {
  it("should save a suggested quote with one click", () => {
    cy.intercept("api/random").as("randomQuote");
    cy.visit("/");
    cy.wait("@randomQuote");
    cy.get("[data-cy='random-quote']")
      .find("[data-cy='random-quote-add-button']")
      .then($randomQuote => {
        expect($randomQuote, "a dismiss button to be visible").to.exist;

        cy.get("[data-cy='random-quote-add-button']").click();

        cy.get('[data-cy="quotes-list"]')
          .children()
          .its("length")
          .as("savedQuotesLength")
          .then(savedQuotesLength => {
            expect(
              savedQuotesLength,
              "expected the quote to be added to the user list"
            ).to.eq(1);
          });
      });
  });
});
