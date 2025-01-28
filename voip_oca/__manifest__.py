{
    "name": "Voip OCA",
    "summary": "Provides the use of Voip",
    "version": "17.0.1.0.0",
    "author": "Binhex, Odoo Community Association (OCA)",
    "website": "https://github.com/OCA/connector-telephony",
    "license": "AGPL-3",
    "category": "Productivity/VOIP",
    "depends": ["base", "base_setup", "web", "mail"],
    # always loaded
    "data": [
        "security/ir.model.access.csv",
        "views/voip_oca_call.xml",
        "views/res_config_settings_views.xml",
        "views/menus.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "voip_oca/static/src/scss/mixins.scss",
            "voip_oca/static/src/phone/phone.scss",
            "voip_oca/static/src/**/*.xml",
            "voip_oca/static/src/**/*.js",
        ],
    },
    "installable": True,
}
