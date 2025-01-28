/* @odoo-module */

import {Record} from "@mail/core/common/record";
import {assignDefined} from "@mail/utils/common/misc";
import {deserializeDateTime} from "@web/core/l10n/dates";
import {url} from "@web/core/utils/urls";
import {_t} from "@web/core/l10n/translation";

export class Call extends Record {
    static id = "id";
    /** @type {Object.<number, Call>} */
    static records = {};

    /**
     * @param {Object} data
     * @returns {Call}
     */
    static insertCall(data) {
        const call = this.get(data) ?? this.new(data);
        if (data.partner) {
            data.partner = this.store.Persona.insert({
                ...data.partner,
                type: "partner",
            });
        }
        if (data.creationDate) {
            data.creationDate = deserializeDateTime(data.creationDate);
        }
        if (data.startDate) {
            data.startDate = deserializeDateTime(data.startDate);
        }
        if (data.endDate) {
            data.endDate = deserializeDateTime(data.endDate);
        }
        assignDefined(call, data);
        return call;
    }

    activity;
    creationDate;
    typeCall;
    displayName;
    endDate;
    partner;
    phoneNumber;
    startDate;
    state;
    timer;

    get callDate() {
        if (this.state === "terminated") {
            return this.startDate.toLocaleString(luxon.DateTime.DATETIME_SHORT);
        }
        return this.creationDate.toLocaleString(luxon.DateTime.DATETIME_SHORT);
    }

    get duration() {
        if (!this.startDate || !this.endDate) {
            return 0;
        }
        return (this.endDate - this.startDate) / 1000;
    }

    get iconTypeCall() {
        return this.typeCall === "incoming"
            ? "fa fa-long-arrow-left"
            : "fa fa-long-arrow-right";
    }

    get imagePartner() {
        return url("/web/image", {
            model: "res.partner",
            id: this.partner.id,
            field: "avatar_128",
        });
    }

    get durationString() {
        if (!this.duration) {
            return "";
        }
        const minutes = Math.floor(this.duration / 60);
        const seconds = this.duration % 60;
        if (minutes === 0) {
            switch (seconds) {
                case 0:
                    return _t("less than a second");
                case 1:
                    return _t("1 second");
                case 2:
                    return _t("2 seconds");
                default:
                    return _t("%(seconds)s seconds", {seconds});
            }
        }
        if (seconds === 0) {
            switch (minutes) {
                case 1:
                    return _t("1 minute");
                case 2:
                    return _t("2 minutes");
                default:
                    return _t("%(minutes)s minutes", {minutes});
            }
        }
        return _t("%(minutes)s min %(seconds)s sec", {minutes, seconds});
    }
}

Call.register();
