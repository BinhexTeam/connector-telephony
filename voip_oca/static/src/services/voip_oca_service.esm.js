/** @odoo-module **/

import {Deferred} from "@web/core/utils/concurrency";
import {SoftphoneModel} from "@voip_oca/softphone/models/softphone_model.esm";
import {VoipOCASoftphoneContainer} from "@voip_oca/softphone/softphone_container.esm";
import {VoipOCASystray} from "@voip_oca/web/voip_oca_systray.esm";
import {reactive} from "@odoo/owl";
import {registry} from "@web/core/registry";

export class VoipOCA {
    isReady = new Deferred();

    constructor(env, services) {
        this.env = env;
        this.messaging = services["mail.messaging"];
        this.store = services["mail.store"];
        this.ormService = services.orm;
        this.phoneModel = new SoftphoneModel(this.store, this);
        this.baseUrlImage = "/web/image";
        this.messaging.isReady.then(() => {
            this.isReady.resolve();
        });

        return reactive(this);
    }

    get calls() {
        return this.store.Call.records;
    }

    getActivities(searchInputValue = "") {
        return [searchInputValue];
    }

    async getRecentCalls(offset = 0, limit = 100) {
        this._recentCallsData = this.ormService.call(
            "voip.oca.call",
            "get_recent_calls",
            [],
            {
                offset: offset,
                limit: limit,
                search_terms: this.phoneModel.searchInputValue,
            }
        );
        const callsData = await this._recentCallsData;
        callsData.forEach((data) => this.store.Call.insertCall(data));
        this._recentCallsData = null;
    }

    async getContacts(_search = "", offset = 0, limit = 13) {
        this._contactData = this.ormService.call("res.partner", "get_contacts", [], {
            offset,
            limit,
            _search,
        });
        const contactsData = await this._contactData;
        contactsData.forEach((contactData) =>
            this.store.Persona.insert({...contactData, type: "partner"})
        );
        this._contactData = null;
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
        this.env = env;
        this.user = user;
        registry.category("main_components").add("voip_oca.VoipOCASoftphoneContainer", {
            Component: VoipOCASoftphoneContainer,
        });
        registry
            .category("systray")
            .add("voip_systray_oca", {Component: VoipOCASystray});
        return new VoipOCA(...arguments);
    },
};

registry.category("services").add("voip_oca", voipOCAService);
