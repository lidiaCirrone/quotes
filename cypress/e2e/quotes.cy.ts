/* 
  There is a free text area where I can paste or write the quote I want to save
  There is a text area in which I can write author's name (not mandatory, in case the quote is by anonymous)
  The saved quote is instantly listed under the text area, newer quotes first
  Scrolling down the list I can see all my saved quotes, with author's name
 */

describe("Writing and saving new quotes", () => {
  it("looks for the input fields and fills in the form, adds new quotes to the user's list and shows all of them in chronological order with the newest ones on top", () => {
    cy.visit("/");

    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy="new-quote-text"]').type(
        `Lorem ipsum dolor sit amet - ${i + 1}`
      );
      cy.get('[data-cy="new-quote-author"]').type("Test user");
      cy.get('[data-cy="new-quote-add-button"]').click();
    }

    cy.get('[data-cy="quotes-list"]').children().as("allQuotes");
    cy.get("@allQuotes")
      .first()
      .invoke("attr", "data-cy-quote-date")
      .then(firstDate =>
        cy
          .get("@allQuotes")
          .eq(1)
          .invoke("attr", "data-cy-quote-date")
          .then(secondDate => {
            cy.get("@allQuotes")
              .eq(2)
              .invoke("attr", "data-cy-quote-date")
              .then(thirdDate => {
                expect(parseInt(firstDate!)).to.be.greaterThan(
                  parseInt(secondDate!),
                  "expected first quote to be the most recent"
                );
                expect(parseInt(secondDate!)).to.be.greaterThan(
                  parseInt(thirdDate!),
                  "expected last quote to be the oldest"
                );
              });
          })
      );
  });
});
