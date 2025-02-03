/** @odoo-module **/
import {Component, useEffect, useRef, useState} from "@odoo/owl";
import {useSelection} from "@mail/utils/common/hooks";
import {useService} from "@web/core/utils/hooks";

export class SoftphoneNumpad extends Component {
    static props = {};

    setup() {
        super.setup();
        this.actions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
        this.voip_oca = useState(useService("voip_oca"));
        this.phoneModel = useState(this.voip_oca.phoneModel);
        this.phoneNumpadValue = useRef("phoneNumpadValue");
        this.selectionNumpad = useSelection({
            refName: "phoneNumpadValue",
            model: this.phoneModel.numpad.selection,
        });

        useEffect(
            (shouldFocus) => {
                if (shouldFocus) {
                    this.phoneNumpadValue.el.focus();
                    this.selectionNumpad.restore();
                    this.phoneModel.shouldFocus = false;
                }
            },
            () => [this.phoneModel.shouldFocus]
        );
    }

    onNumpadKeyClick(ev) {
        const key = ev.target.textContent;
        const {value} = this.phoneModel.numpad;
        const {selectionStart, selectionEnd} = this.phoneNumpadValue.el;
        this.phoneModel.numpad.value =
            value.slice(0, selectionStart) + key + value.slice(selectionEnd);
        this.selectionNumpad.moveCursor(selectionStart + 1);
        this.phoneModel.shouldFocus = true;
    }

    onPhoneNumpadValue(ev) {
        if (ev.key !== "Enter") {
            return;
        }
        const inputValue = this.phoneModel.numpad.value.trim();
        if (!inputValue) {
            return;
        }
    }

    get keyboardActions() {
        return this.actions;
    }
}

SoftphoneNumpad.template = "voip_oca.SoftphoneNumpad";
