/** @odoo-module **/
import {SoftphoneDetailModel} from "./softphone_detail_model.esm";
import {isSubstring} from "@voip_oca/utils/utils.esm";
import {url} from "@web/core/utils/urls";

export class SoftphoneModel {
    activeTabId = "recent";
    isDisplayed = false;
    isFolded = false;
    isPhoneDetail = false;

    searchInputValue = "";
    selectedDetail;
    enableNumpad = false;
    shouldFocus = false;
    numpad = {
        isOpen: false,
        value: "",
        selection: {
            start: 0,
            end: 0,
            direction: "none",
        },
    };

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

    openDetail({detailCall, detailActivity, detailContact}) {
        this.selectedDetail = new SoftphoneDetailModel({
            detailCall,
            detailActivity,
            detailContact,
        });
        this.isPhoneDetail = true;
    }

    urlImagePartner(partner_id) {
        return url("/web/image", {
            model: "res.partner",
            id: partner_id,
            field: "avatar_128",
        });
    }
}
