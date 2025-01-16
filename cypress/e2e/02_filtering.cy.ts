interface MockedQuote {
  author: string;
  text: string;
}

function addStartingQuotes(fixtureName: string) {
  cy.fixture(fixtureName).then((quotes: MockedQuote[]) => {
    for (let i = 0; i < quotes.length; i++) {
      if (quotes[i].author.length > 0)
        cy.get('[data-cy="new-quote-author"]').type(quotes[i].author);
      cy.get('[data-cy="new-quote-text"]').type(quotes[i].text);
      cy.get('[data-cy="new-quote-add-button"]').click();
    }
  });
}

function checkFilteredQuotes(filterString: string) {
  const keywords = filterString.replaceAll(" ", "|");
  const filterRegExp = new RegExp(`\\b(${keywords})\\b`, "i");
  cy.get("[data-cy='quotes-filter'").type(filterString);
  cy.get("[data-cy='quotes-filter'").type("{enter}");
  cy.get('[data-cy="quotes-list"]')
    .children()
    .each(quote => {
      expect(quote.text()).to.match(filterRegExp);
    });
}

/*
    - I must see a text field somewhere near my list.
    - When I write text in there, the list must be filtered by the words in there.
    - Each separate word is a different keyword, so searching for "one two three" I will get all of the following quotes in the list: "First of all, I never second silly statements", "Two gust is megl che uan", "Three is a magic number".
    - Keywords must also contain author names so searching for "einstein" may result in Einstein quotes as well as on quotes on Einstein. 
*/

describe("Filter quotes", () => {
  it("should filter the quotes list using the word(s) typed in the input field, using them as separate keywords", () => {
    cy.visit("/");
    addStartingQuotes("filtering_oneTwoThree");

    const filterString = "one two three";
    checkFilteredQuotes(filterString);
    cy.pause();
  });

  it("should filter the quotes list using the word(s) typed in the input field, searching both in the text and the author string", () => {
    cy.visit("/");
    addStartingQuotes("filtering_einstein");
    checkFilteredQuotes("einstein");
  });
});
