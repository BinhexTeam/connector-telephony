# -*- coding: utf-8 -*-
from email.policy import default

from odoo import models, fields, api


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    asteriks_voip = fields.Boolean(default=True, config_parameter='voip_oca.asteriks_voip', string="Asteriks (Voip)")
    pbx_ip = fields.Char(config_parameter='voip_oca.pbx_ip', default='localhost')
    ws_server = fields.Char(config_parameter='voip_oca.ws_server', default='ws://localhost')
    mode = fields.Selection([('test', 'Test'), ('prod', 'Production')], config_parameter='voip_oca.mode',
                            string="Environment", default='test')
