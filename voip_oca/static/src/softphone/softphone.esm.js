/** @odoo-module **/
import {Component, useRef, useState} from "@odoo/owl";
import {
    SoftphoneActivity,
    SoftphoneContact,
    SoftphoneDetail,
    SoftphoneNumpad,
    SoftphoneRecent,
} from "@voip_oca/softphone/components/components.esm";
import {_t} from "@web/core/l10n/translation";
import {markEventHandled} from "@web/core/utils/misc";
import {useDebounced} from "@web/core/utils/timing";
import {useService} from "@web/core/utils/hooks";

export class VoipOCASoftphone extends Component {
    static components = {
        SoftphoneRecent,
        SoftphoneActivity,
        SoftphoneContact,
        SoftphoneDetail,
        SoftphoneNumpad,
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
                this.voip_oca.getContacts();
                break;
            case "activity":
                this.voip_oca.getActivities();
                break;
            case "recent":
                this.voip_oca.getRecentCalls();
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
    openNumpad() {
        this.phoneModel.enableNumpad = !this.phoneModel.enableNumpad;
        this.phoneModel.shouldFocus = !this.phoneModel.shouldFocus;
    }
}

VoipOCASoftphone.template = "voip_oca.VoipOCASoftphone";
