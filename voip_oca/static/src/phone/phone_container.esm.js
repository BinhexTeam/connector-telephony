/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {VoipOcaPhone} from "@voip_oca/phone/phone.esm";
import {useService} from "@web/core/utils/hooks";

export class VoipOCAPhoneContainer extends Component {
    static props = {};
    static components = {VoipOcaPhone};

    setup() {
        super.setup();
        this.voip_oca = useState(useService("voip_oca"));
    }
}

VoipOCAPhoneContainer.template = "voip_oca.VoipOCAPhoneContainer";
