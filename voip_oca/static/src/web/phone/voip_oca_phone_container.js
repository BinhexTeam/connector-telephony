/** @odoo-module **/

import VoipOcaPhone from "@voip_oca/web/phone/voip_oca_phone";
import {Component, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";

export class VoipOcaPhoneContainer extends Component {
    static props = {};
    static components = {VoipOcaPhone};

    setup() {
        super.setup();
        this.voip = useState(useService("voip_oca"));
        // this.voip.isReady.then(() => {
        //     if (this.voip.missedCalls !== 0) {
        //         this.voip.softphone.show();
        //         this.voip.softphone.fold();
        //     }
        // });
    }
}

VoipOcaPhoneContainer.template = "voip_oca.VoipOcaPhoneContainer";
