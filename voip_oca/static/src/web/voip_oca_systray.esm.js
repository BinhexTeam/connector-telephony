/** @odoo-module */

import {Component, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";

export class VoipOCASystray extends Component {
    static props = {};

    setup() {
        super.setup();
        this.voip_oca = useState(useService("voip_oca"));
    }

    onClickOpenVoip() {
        if (
            !this.voip_oca.phoneModel.isDisplayed ||
            !this.voip_oca.phoneModel.isFolded
        ) {
            this.voip_oca.isReady.then(() => {
                this.voip_oca.phoneModel.show();
                this.voip_oca.phoneModel.fold();
            });
        } else {
            this.voip_oca.phoneModel.hide();
        }
    }
}

VoipOCASystray.template = "voip_oca.VoipOCASystray";
