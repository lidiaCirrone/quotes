/* 
  - The new quotes must be visible at page load
  - I want to easily dismiss the new quote if I don't like it
  - The quotes can be taken from public sources such as https://type.fit/api/quotes
  - No need for quotes sources to be configurable
  - The suggested quotes must be visible on desktop, mobile is not mandatory since I fear it would clutter the interface: if you find a clever solution, it may be nice to have them

*/

describe("Suggest random quote", () => {
  it("should suggest a new quote on every page load", () => {
    cy.intercept("api/random").as("randomQuote");
    cy.visit("/");
    cy.wait("@randomQuote");
    cy.get("[data-cy='random-quote']").then($randomQuote => {
      expect(
        $randomQuote,
        "expected a random quote to be visible after the API has been called"
      ).to.exist;

      cy.get("[data-cy='random-quote']")
        .find("[data-cy='random-quote-dismiss-button']")
        .then($randomQuote => {
          expect($randomQuote, "a dismiss button to be visible").to.exist;
          expect($randomQuote, "expected the dismiss button to be enabled").not
            .to.be.disabled;
        });
    });
  });
});
