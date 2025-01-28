/** @odoo-module **/

import {Component, onMounted, useState} from "@odoo/owl";
import {url} from "@web/core/utils/urls";
import {useService} from "@web/core/utils/hooks";

export class PhoneContact extends Component {
    static props = {};

    setup() {
        super.setup();
        this.voip_oca = useState(useService("voip_oca"));
        this.store = useState(useService("mail.store"));
        onMounted(() => this.voip_oca.getContacts());
    }

    getAvatarUrl(partner) {
        return url(this.voip_oca.baseUrlImage, {
            model: "res.partner",
            id: partner.id,
            field: "avatar_128",
        });
    }

    onClickContact(ev, contact) {
        return this.store.Persona.get(contact);
    }
}

PhoneContact.template = "voip_oca.PhoneContact";
