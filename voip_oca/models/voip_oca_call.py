from odoo import api, fields, models
from odoo.osv import expression

VOIP_STATES = ["aborted", "calling", "missed", "ongoing", "rejected", "terminated"]

VOIP_TYPE_CALL = [
    ("incoming", "Incoming"),
    ("outgoing", "Outgoing"),
]


class VoipOcaCall(models.Model):
    _name = "voip.oca.call"
    _description = "Voip OCA Call"

    phone_number = fields.Char(related="partner_id.phone", store=True)
    type_call = fields.Selection(
        VOIP_TYPE_CALL,
        default="outgoing",
    )
    state = fields.Selection(
        [(voip_state, voip_state.capitalize()) for voip_state in VOIP_STATES],
        default="calling",
        index=True,
    )
    end_date = fields.Datetime()
    start_date = fields.Datetime()
    activity_name = fields.Char(
        help="The name of the activity related to this phone call, if any."
    )
    partner_id = fields.Many2one("res.partner", "Contact", index=True)
    user_id = fields.Many2one(
        "res.users", "Responsible", default=lambda self: self.env.uid, index=True
    )

    @api.depends("state", "partner_id.name")
    def _compute_display_name(self):
        for rec in self:
            rec.display_name = (
                f"{VOIP_STATES[VOIP_STATES.index(rec.state) - 1].capitalize()} "
                + rec.partner_id.display_name
            )

    def _format(self):
        return [
            {
                "id": call.id,
                "creationDate": call.create_date,
                "typeCall": call.type_call,
                "displayName": call.display_name,
                "endDate": call.end_date,
                "partner": call.partner_id._format()[0] if call.partner_id else False,
                "phoneNumber": call.phone_number,
                "startDate": call.start_date,
                "state": call.state,
            }
            for call in self
        ]

    @api.model
    def get_recent_calls(self, search_terms=None, offset=0, limit=10):
        domain = [("user_id", "=", self.env.uid)]
        if search_terms:
            search_fields = ["phone_number", "partner_id.name", "activity_name"]
            search_domain = expression.OR(
                [[(field, "ilike", search_terms)] for field in search_fields]
            )
            domain += search_domain
        return self.search(
            domain, offset=offset, limit=limit, order="create_date DESC"
        )._format()
