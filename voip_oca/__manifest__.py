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
        "views/res_config_settings_views.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "voip_oca/static/src/**/*.scss",
            "voip_oca/static/src/**/*.xml",
            "voip_oca/static/src/**/*.js",
        ],
    },
    "installable": True,
}
