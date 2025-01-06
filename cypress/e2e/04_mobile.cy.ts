/* 
  - I am able to visit the quoting page from my mobile device
  - I can see the list and filter it by keywords
  - I can always see the author of each quote directly
*/

describe("See the quote list on a mobile device", () => {
  it("should show the quote list, allow to filter the items, and always shows the author directly", () => {
    cy.viewport(393, 852); // iPhone 16
    cy.visit("/");
    cy.fixture("mobile").then(quotes => {
      for (let i = 0; i < quotes.length; i++) {
        cy.get('[data-cy="new-quote-author"]').type(quotes[i].author);
        cy.get('[data-cy="new-quote-text"]').type(quotes[i].text);
        cy.get('[data-cy="new-quote-add-button"]').click();
      }
    });

    const filterString = "family";
    cy.get("[data-cy='quotes-filter'").type(filterString);
    cy.get("[data-cy='quotes-filter'").type("{enter}");

    cy.get('[data-cy="quotes-list"]').each($quote => {
      cy.wrap($quote).within(() => {
        cy.get("[data-cy='quote-author']").each(() => {
          cy.get("[data-cy='quote-author']").should($author => {
            expect($author, "expected author name to be visible").to.exist;
          });
        });
      });
    });
  });
});
