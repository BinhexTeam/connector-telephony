/** @odoo-module **/
import {Component, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";

export class SoftphoneDetail extends Component {
    static components = {};
    static props = ["detailPhone"];

    setup() {
        this.actionService = useService("action");
        this.voip_oca = useState(useService("voip_oca"));
        this.phoneModel = useState(this.voip_oca.phoneModel);
        this.detailContact = this.props.detailPhone.detailContact;
        this.detailCall = this.props.detailPhone.detailCall;
        this.detailActivity = this.props.detailPhone.detailActivity;
        this.actions = {
            email: "mail.compose.message",
            info: "res.partner",
            activity: "mail.activity",
        };
    }

    get partner() {
        return this.detailContact ? this.detailContact : false;
    }

    get callMobileNumber() {
        return this.detailContact.mobileNumber
            ? this.detailContact.mobileNumber
            : this.detailContact.landlineNumber;
    }

    onActions(typeAction) {
        const res_model = this.actions[typeAction];
        if (res_model) {
            this.phoneModel.unfold();
            let context = {
                default_model: res_model,
            };
            const action = {
                type: "ir.actions.act_window",
                res_model: res_model,
                views: [[false, "form"]],
                target: "new",
            };

            switch (typeAction) {
                case "email":
                    Object.assign(context, {
                        default_res_ids: [this.detailContact.id],
                        default_partner_ids: [this.detailContact.id],
                        default_composition_mode: "comment",
                        default_use_template: true,
                        default_subject: "Comment",
                    });
                    break;
                case "info":
                    context = {};
                    action.res_id = this.detailContact.id;
                    break;
                default:
                    context = {
                        default_res_id: this.detailActivity
                            ? this.detailActivity.res_id
                            : this.detailContact.id,
                        default_res_model: this.detailActivity
                            ? res_model
                            : this.actions.info,
                    };
                    break;
            }
            action.context = context;
            this.actionService.doAction(action);
        }
    }

    onDetailBack() {
        this.phoneModel.isPhoneDetail = false;
    }
}

SoftphoneDetail.template = "voip_oca.SoftphoneDetail";
