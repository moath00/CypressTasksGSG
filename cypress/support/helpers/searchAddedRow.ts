export default class Finder {
    addedRow(response: any): void {
        // some code to get the table headers
        cy.get('.oxd-table-header-cell').as('tableHeaders');
        const headers = cy.get('@tableHeaders');
        // some code to assert the response keys with the matched headers
        headers.each((cell) => {
            console.log(headers);
            console.log(cell);
            cy.wrap(cell).invoke("text").then((text) => {
                console.log(text);
                console.log(response.data[text]);
                // assert if the response values exist in the table rows or not?
                if (response.data[text])
                    console.log('exist');
            });
        });
    }
}