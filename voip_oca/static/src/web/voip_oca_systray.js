/** @odoo-module */

import {Component, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";

export class VoipOCASystray extends Component {
    static props = {};

    setup() {
        super.setup();
        this.voip_oca = useState(useService("voip_oca"));
    }

    onClick() {
        return;
    }
}

VoipOCASystray.template = "voip_oca.VoipOCASystray";
