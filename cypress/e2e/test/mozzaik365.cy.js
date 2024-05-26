import { lockedoutUser } from "../pages/lockedoutUserPage";
import { standardUser } from "../pages/standardUserPage";

describe ("Launch Page", function () {
    this.beforeEach('', async function () {

    });
    it("Perform Actions for A Standard User", ()=> {
        standardUser.loginFlow();
        standardUser.viewIndividualProduct();
        standardUser.sortProductsbyPrice();
        standardUser.sortProductsbyName();
        standardUser.cart();
        standardUser.checkout();
    });

    it("Perform Actions for A Locked Out User", ()=> {
        lockedoutUser.loginFlow();
    });
    });