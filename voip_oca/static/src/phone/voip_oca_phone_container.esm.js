/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {VoipOcaPhone} from "@voip_oca/phone/voip_oca_phone.esm";
import {useService} from "@web/core/utils/hooks";

export class VoipOCAPhoneContainer extends Component {
    static props = {};
    static components = {VoipOcaPhone};

    setup() {
        super.setup();
        this.voip_oca = useState(useService("voip_oca"));

        this.voip_oca.isReady.then(() => {
            this.voip_oca.phoneOCA.show();
            this.voip_oca.phoneOCA.fold();
        });
    }
}

VoipOCAPhoneContainer.template = "voip_oca.VoipOCAPhoneContainer";
