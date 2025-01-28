from odoo import _, api, fields, models
from odoo.osv import expression

VOIP_STATES = [
    ("aborted", "Aborted"),
    ("calling", "Calling"),
    ("missed", "Missed"),
    ("ongoing", "Ongoing"),
    ("rejected", "Rejected"),
    ("terminated", "Terminated"),
]

VOIP_DIRECTION = [
    ("incoming", "Incoming"),
    ("outgoing", "Outgoing"),
]


class VoipOcaCall(models.Model):
    _name = "voip.oca.call"
    _description = "Voip OCA Call"

    phone_number = fields.Char(related="partner_id.phone", store=True)
    direction = fields.Selection(
        VOIP_DIRECTION,
        default="outgoing",
        readonly=True,
    )
    state = fields.Selection(VOIP_STATES, default="calling", index=True)
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
        def get_name(call):
            if call.activity_name:
                return call.activity_name
            if call.state == "aborted":
                return _(
                    "Aborted call to %(phone_number)s", phone_number=call.phone_number
                )
            if call.state == "missed":
                return _(
                    "Missed call from %(phone_number)s", phone_number=call.phone_number
                )
            if call.state == "rejected":
                if call.direction == "incoming":
                    return _(
                        "Rejected call from %(phone_number)s",
                        phone_number=call.phone_number,
                    )
                return _(
                    "Rejected call to %(phone_number)s", phone_number=call.phone_number
                )
            if call.partner_id:
                if call.direction == "incoming":
                    return _(
                        "Call from %(correspondent)s",
                        correspondent=call.partner_id.name,
                    )
                return _(
                    "Call to %(correspondent)s", correspondent=call.partner_id.name
                )
            if call.direction == "incoming":
                return _("Call from %(phone_number)s", phone_number=call.phone_number)
            return _("Call to %(phone_number)s", phone_number=call.phone_number)

        for call in self:
            call.display_name = get_name(call)

    def _format_calls(self):
        return [
            {
                "id": call.id,
                "creationDate": call.create_date,
                "direction": call.direction,
                "displayName": call.display_name,
                "endDate": call.end_date,
                "partner": call.partner_id._format_contacts()[0]
                if call.partner_id
                else False,
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
        )._format_calls()
