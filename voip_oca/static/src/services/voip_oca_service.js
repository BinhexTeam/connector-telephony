/** @odoo-module **/

import {EventBus, reactive} from "@odoo/owl";

import {VoipOcaPhoneContainer} from "@voip_oca/web/phone/voip_oca_phone_container";
import {VoipOCASystray} from "@voip_oca/web/voip_oca_systray";
import {registry} from "@web/core/registry";
import {Deferred} from "@web/core/utils/concurrency";

export class VoipOCA {
    constructor(env, services) {
        this.env = env;
        this.callService = services["voip.call"];
        return reactive(this);
    }
}

export const voipOCAService = {
    dependencies: [
        "bus_service",
        "dialog",
        "mail.activity",
        "mail.messaging",
        "mail.store",
        "mail.user_settings",
        "orm",
        "user",
        // "voip.call",
    ],
    async start(env, {user}) {
        const isEmployee = await user.hasGroup("base.group_user");
        if (!isEmployee) {
            const isReady = new Deferred();
            return {
                bus: new EventBus(),
                get canCall() {
                    return false;
                },
                isReady,
            };
        }
        registry.category("main_components").add("voip_oca.VoipOcaPhoneContainer", {
            Component: VoipOcaPhoneContainer,
        });
        registry
            .category("systray")
            .add("voip_systray_oca", {Component: VoipOCASystray});
        return new VoipOCA(...arguments);
    },
};

registry.category("services").add("voip_oca", voipOCAService);
