/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {VoipOCASoftphone} from "@voip_oca/softphone/softphone.esm";
import {useService} from "@web/core/utils/hooks";

export class VoipOCASoftphoneContainer extends Component {
    static props = {};
    static components = {VoipOCASoftphone};

    setup() {
        super.setup();
        this.voip_oca = useState(useService("voip_oca"));
    }
}

VoipOCASoftphoneContainer.template = "voip_oca.VoipOCASoftphoneContainer";
