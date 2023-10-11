class Requests {
    applyRequest(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        body?: object,
        payload?: object
    ): any {
        if (body)
            return cy.api(method, url, body);
        if (payload)
            return cy.api(method, url, payload);

        function assertion(response: JSON) {
            expect(response).property("status").to.equal(201);
        }
    }
}

export default Requests;