/** @odoo-module **/

import {Component, onMounted, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";

export class SoftphoneContact extends Component {
    static props = {
        contacts: {type: Array},
    };

    setup() {
        super.setup();
        this.voip_oca = useState(useService("voip_oca"));
        this.phoneModel = useState(this.voip_oca.phoneModel);
        onMounted(() => this.voip_oca.getContacts());
    }

    onClickContact(contact) {
        this.phoneModel.openDetail({detailContact: contact});
    }

    imagePartner(partner) {
        return this.phoneModel.urlImagePartner(partner.id);
    }
}

SoftphoneContact.template = "voip_oca.SoftphoneContact";
