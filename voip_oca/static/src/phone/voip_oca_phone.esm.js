/** @odoo-module **/

import {Component, useRef, useState} from "@odoo/owl";
import {_t} from "@web/core/l10n/translation";
import {useDebounced} from "@web/core/utils/timing";
import {useService} from "@web/core/utils/hooks";
import {VoipOCAPhoneActivity} from "./voip_oca_phone_activity.esm";
import {VoipOCAPhoneContact} from "./voip_oca_phone_contact.esm";
import {VoipOCAPhoneRecent} from "./voip_oca_phone_recent.esm";

export class VoipOcaPhone extends Component {
    static components = {
        VoipOCAPhoneRecent,
        VoipOCAPhoneActivity,
        VoipOCAPhoneContact,
    };
    static props = {};

    setup() {
        this.voip_oca = useState(useService("voip_oca"));
        this.searchBar = useRef("searchInput");
        this.phoneModel = useState(this.voip_oca.phoneOCA);

        this.onInputSearchBar = useDebounced(() => this.searchInput(), 300);
    }

    get tabList() {
        return [
            {id: "recent", name: _t("Recent")},
            {id: "activity", name: _t("Next Activities")},
            {id: "contacts", name: _t("Contacts")},
        ];
    }

    onClickTab(ev) {
        this.phoneModel.activeTabId = ev.target.dataset.id;
    }

    get activeTabId() {
        return this.phoneModel.activeTabId;
    }

    searchInput() {
        switch (this.activeTabId) {
            case "contacts":
                this.voip_oca.getContacts(this.phoneModel.searchInputValue);
                break;
            case "activity":
                this.voip_oca.getActivities(this.phoneModel.searchInputValue);
                break;
            case "recent":
                this.voip_oca.getRecents(this.phoneModel.searchInputValue);
                break;
        }
    }
}

VoipOcaPhone.template = "voip_oca.VoipOcaPhone";
