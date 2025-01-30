/** @odoo-module **/
import {Component, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";

export class VoipOcaPhoneDetail extends Component {
    static components = {};
    static props = ["detailPhone"];

    setup() {
        this.voip_oca = useState(useService("voip_oca"));
        this.phoneModel = useState(this.voip_oca.phoneModel);
        this.detailContact = this.props.detailPhone.detailContact;
        this.detailCall = this.props.detailPhone.detailCall;
    }

    get partner() {
        return this.detailContact ? this.detailContact : false;
    }

    get callMobileNumber() {
        return this.detailContact.mobileNumber
            ? this.detailContact.mobileNumber
            : this.detailContact.landlineNumber;
    }

    onSendEmail() {
        console.warn("onSendEmail");
    }

    onInfoContact() {
        return;
    }

    onCreateActivity() {
        return;
    }

    onDetailBack() {
        return;
    }
}

VoipOcaPhoneDetail.template = "voip_oca.VoipOcaPhoneDetail";
