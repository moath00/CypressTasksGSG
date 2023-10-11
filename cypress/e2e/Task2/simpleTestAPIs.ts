import newLogin from '../e2eObjects/login';
import Requests from '../e2eObjects/api';

const login = new newLogin();
const rest = new Requests();

const email = `${Math.round(Math.random() * 1000)}test${Math.round(Math.random() * 1000)}@tst.com`;
const password = `jed${Math.round(Math.random() * 1000)}dad${Math.round(Math.random() * 1000)}Jake123`;

// beforeEach(() => cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php"));


// 11
describe("Login and invoke the time span in Time at Work", () => {
    it("Invoke the span from dashboard", () => {
        cy.fixture('loginData.json').as('data');
        cy.get('@data').then((data: any) => {
            login.passedLogin(data.correctUsername, data.correctPassword);
        });
        cy.get(".oxd-grid-item.oxd-grid-item--gutters.orangehrm-dashboard-widget").eq(0).children().children().eq(2).contains('span', "Today").then((item) => {
            console.log(item);
        })
    });
});

describe("Test api with plugin", () => {
    it("Test login api", () => {
        cy.api({
            method: 'POST',
            url: "https://conduit.productionready.io/api/users",
            body: {
                "user": {
                    "username": "testprtewa",
                    "email": "moath@ail.com",
                    "password": "test123"
                }
            }
        });
    });
});


describe.only("Test api with plugin from helper", () => {
    it("Test login api", () => {
        rest.applyRequest('POST', 'https://conduit.productionready.io/api/users', {
            "user": {
                "username": `cccoooMoath${Math.round(Math.random() * 10000)}`,
                "email": email,
                "password": password
            }
        });
    });
});

describe.only("Test api with plugin from helper", () => {
    it("Test login api", () => {

        rest.applyRequest('POST', 'https://conduit.productionready.io/api/users/login', {
            "user": {
                "email": email,
                "password": password
            }
        });
    });
});