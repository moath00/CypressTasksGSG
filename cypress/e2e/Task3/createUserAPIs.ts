import addUser from "../../support/helpers/signupHelper";

describe('Signup Logic', () => {
    it('Singup: User should be able to create new user', () => {
        addUser.addNewUserViaAPI();
    })
});