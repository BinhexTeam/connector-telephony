/** @odoo-module **/

import {Component, onMounted, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";

export class PhoneRecent extends Component {
    static props = {
        recentCalls: {type: Array},
    };

    setup() {
        super.setup();
        this.voip_oca = useState(useService("voip_oca"));
        this.phoneModel = useState(this.voip_oca.phoneModel);
        onMounted(() => this.voip_oca.getRecentCalls());
    }

    onCallDetail(call) {
        this.phoneModel.openDetail({detailCall: call});
    }
}

PhoneRecent.template = "voip_oca.PhoneRecent";
