/** @odoo-module **/

export class VoipOCAPhoneModel {
    activeTabId = "activity";
    isDisplayed = false;
    isFolded = false;

    searchInputValue = "";

    show() {
        this.isDisplayed = true;
        this.isFolded = false;
    }
    hide() {
        this.isDisplayed = false;
    }

    fold() {
        this.isFolded = true;
    }

    unfold() {
        this.isFolded = false;
    }
}
