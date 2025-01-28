/** @odoo-module **/
import {isSubstring} from "@voip_oca/utils/utils.esm";

export class PhoneModel {
    activeTabId = "recent";
    isDisplayed = false;
    isFolded = false;

    searchInputValue = "";

    constructor(store, voip) {
        this.store = store;
        this.voip_oca = voip;
    }

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

    get recentCalls() {
        const filteredCalls = (() => {
            if (this.searchInputValue) {
                return Object.values(this.voip_oca.calls).filter(
                    (call) =>
                        isSubstring(call.phoneNumber, this.searchInputValue) ||
                        (call.partner &&
                            isSubstring(call.partner.name, this.searchInputValue))
                );
            }
            return Object.values(this.voip_oca.calls);
        })();
        return filteredCalls.sort((a, b) => a.id < b.id);
    }

    get contacts() {
        return Object.values(this.store.Persona.records).filter(
            (contact) =>
                contact.hasPhoneNumber &&
                (!this.searchInputValue ||
                    [
                        contact.name,
                        contact.displayName,
                        contact.mobileNumber,
                        contact.landlineNumber,
                    ].some((x) => isSubstring(x, this.searchInputValue)))
        );
    }
}
