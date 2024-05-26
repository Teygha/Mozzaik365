import { lockedoutUser } from "../pages/lockedoutUserPage";
import { problemUser } from "../pages/problemUserPage";
import { standardUser } from "../pages/standardUserPage";
import { performanceUser } from "../pages/performanceglitchUserPage";

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

    it("Perform Actions for A Problem User", ()=> {
        problemUser.loginFlow();
        problemUser.viewIndividualProduct();
        problemUser.sortProductsbyPrice();
        problemUser.sortProductsbyName();
        problemUser.cart();
        problemUser.checkout();
    });

    it("Perform Actions for A Performance Glitch User", ()=> {
        performanceUser.pageLoad();
        performanceUser.sortProductsbyPrice();
        performanceUser.sortProductsbyName();
        performanceUser.cart();
        performanceUser.checkout();
    });
    });