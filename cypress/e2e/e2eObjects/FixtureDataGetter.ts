class FixtureDataGetter {

    elements = {
        correctData: () => {
            let inputs;
            cy.fixture('loginData.json').as('data');
            cy.get('@data').then( (data:any) => {
                inputs = [data.correctUsername, data.correctPassword];
            });
            return inputs;
        },
        incorrectPassword: () => {
            let inputs;
            cy.fixture('loginData.json').as('data');
            cy.get('@data').then( (data:any) => {
                inputs = [data["correctUsername"], data["wrongPassword"]];
            });
            return inputs;
        },
        incorrectUsername: () => {
            let inputs;
            cy.fixture('loginData.json').as('data');
            cy.get('@data').then( (data:any) => {
                inputs = [data["wrongUsername"], data["correctPassword"]];
            });
            return inputs;
        },
        incorrectData: () => {
            let inputs;
            cy.fixture('loginData.json').as('data');
            cy.get('@data').then( (data:any) => {
                inputs = [data["wrongUsername"], data["wrongPassword"]];
                
            });
            return inputs;
        },
        onlyUsername: () => {
            let inputs;
            cy.fixture('loginData.json').as('data');
            cy.get('@data').then( (data:any) => {
                inputs = [data["correctUsername"], ""];
            });
            return inputs;
        },
        onlyPassword: () => {
            let inputs;
            cy.fixture('loginData.json').as('data');
            cy.get('@data').then( function(data:any) {
                inputs = ["", data["correctPassword"]];
            });
            return inputs;
        },
        empty: () => { ["", ""] }
    }

    getter() {
        return [
            this.elements.incorrectData(),
            this.elements.incorrectPassword(),
            this.elements.incorrectUsername(),
            this.elements.correctData(),
            this.elements.onlyUsername(),
            this.elements.onlyPassword(),
            this.elements.empty()
        ]
    }
}

export default FixtureDataGetter;