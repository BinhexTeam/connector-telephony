/** @odoo-module **/
import {Component, useRef, useState} from "@odoo/owl";
import {PhoneActivity} from "./phone_activity.esm";
import {PhoneContact} from "./phone_contact.esm";
import {PhoneRecent} from "./phone_recent.esm";
import {VoipOcaPhoneDetail} from "./phone_detail.esm";
import {_t} from "@web/core/l10n/translation";
import {markEventHandled} from "@web/core/utils/misc";
import {useDebounced} from "@web/core/utils/timing";
import {useService} from "@web/core/utils/hooks";

export class VoipOcaPhone extends Component {
    static components = {
        PhoneRecent,
        PhoneActivity,
        PhoneContact,
        VoipOcaPhoneDetail,
    };
    static props = {};

    setup() {
        this.voip_oca = useState(useService("voip_oca"));
        this.searchBar = useRef("searchInput");
        this.phoneModel = useState(this.voip_oca.phoneModel);

        this.onInputSearchBar = useDebounced(() => this.searchInput(), 300);
    }

    get tabList() {
        return [
            {id: "recent", name: _t("Recent")},
            {id: "activity", name: _t("Activities")},
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
                this.voip_oca.getRecentCalls(this.phoneModel.searchInputValue);
                break;
        }
    }

    onClosePhone(ev) {
        markEventHandled(ev, "Phone.close");
        this.phoneModel.hide();
    }

    onClickBar() {
        if (this.voip_oca.phoneModel.isFolded) {
            this.phoneModel.unfold();
        } else {
            this.phoneModel.fold();
        }
    }

    get phoneDetail() {
        return this.phoneModel.isPhoneDetail;
    }
}

VoipOcaPhone.template = "voip_oca.VoipOcaPhone";
