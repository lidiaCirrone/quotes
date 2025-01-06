/* 
    - There is a link or button somewhere near each quote to copy it to the clipboard
    - The copied quote have the following format:
    Lorem ipsum dolor sit amet, may this software shining me abet.
    (Author F. Name)
*/

describe("Copy the content of a quote", () => {
  it("should copy both the author and the text of a quote to the clipboard in the following format: `<text>/n(Author <author>)`", () => {
    cy.visit("/");
    cy.get('[data-cy="new-quote-author"]').type("John Doe");
    cy.get('[data-cy="new-quote-text"]').type(
      "Lorem ipsum dolor sit amet, may this software shining me abet."
    );
    cy.get('[data-cy="new-quote-add-button"]').click();
    cy.get('[data-cy="quotes-list"] [data-cy="quote-copy-button"]').click();

    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Browser.grantPermissions",
        params: {
          permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"],
          origin: window.location.origin,
        },
      })
    );

    cy.window()
      .its("navigator.clipboard")
      .then(clip => clip.readText())
      .should(
        "equal",
        `Lorem ipsum dolor sit amet, may this software shining me abet.\r\n(Author J. Doe)`
      );
  });
});
