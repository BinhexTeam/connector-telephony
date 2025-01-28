from odoo import models


class VoipOcaCall(models.Model):
    _inherit = "res.partner"

    def _format_contacts(self):
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
