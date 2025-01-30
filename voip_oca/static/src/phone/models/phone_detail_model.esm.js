/** @odoo-module **/
import {url} from "@web/core/utils/urls";

export class PhoneDetailModel {
    detailCall;
    detailActivity;
    detailContact;

    constructor({detailCall, detailActivity, detailContact}) {
        this.detailCall = detailCall;
        this.detailActivity = detailActivity;
        this.detailContact = detailCall ? detailCall.partner : detailContact;
    }

    get avatarUrl() {
        if (this.detailContact) {
            return url("/web/image", {
                model: "res.partner",
                id: this.detailContact.id,
                field: "avatar_128",
            });
        }
        return "/base/static/img/avatar_grey.png";
    }
}
