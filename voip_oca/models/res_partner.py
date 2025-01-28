from odoo import api, models
from odoo.osv import expression


class VoipOcaCall(models.Model):
    _inherit = "res.partner"

    def _format(self):
        return [
            {
                "id": contact.id,
                "displayName": contact.display_name,
                "email": contact.email,
                "landlineNumber": contact.phone,
                "mobileNumber": contact.mobile,
                "name": contact.name,
            }
            for contact in self
        ]

    @api.model
    def get_contacts(self, _search, offset, limit):
        domain = ["|", ("phone", "!=", False), ("mobile", "!=", False)]
        if _search:
            search_fields = ["display_name", "phone", "mobile", "email"]
            search_domain = expression.OR(
                [[(field, "ilike", _search)] for field in search_fields]
            )
            domain = expression.AND([domain, search_domain])
        return self.search(domain, offset=offset, limit=limit)._format()
