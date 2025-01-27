/** @odoo-module **/

import {Deferred} from "@web/core/utils/concurrency";
import {VoipOCAPhoneContainer} from "@voip_oca/phone/voip_oca_phone_container.esm";
import {VoipOCAPhoneModel} from "@voip_oca/phone/voip_oca_phone_model.esm";
import {VoipOCASystray} from "@voip_oca/web/voip_oca_systray.esm";
import {reactive} from "@odoo/owl";
import {registry} from "@web/core/registry";

export class VoipOCA {
    isReady = new Deferred();

    constructor(env, services) {
        this.env = env;
        this.messaging = services["mail.messaging"];
        this.store = services["mail.store"];
        this.phoneOCA = new VoipOCAPhoneModel(this.store, this);
        this.messaging.isReady.then(() => {
            this.isReady.resolve();
        });

        return reactive(this);
    }

    getContacts(searchInputValue = "") {
        return [searchInputValue];
    }

    getActivities(searchInputValue = "") {
        return [searchInputValue];
    }

    getRecents(searchInputValue = "") {
        return [searchInputValue];
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
        registry.category("main_components").add("voip_oca.VoipOCAPhoneContainer", {
            Component: VoipOCAPhoneContainer,
        });
        registry
            .category("systray")
            .add("voip_systray_oca", {Component: VoipOCASystray});
        return new VoipOCA(...arguments);
    },
};

registry.category("services").add("voip_oca", voipOCAService);
