/* @odoo-module */

export function isSubstring(targetString, substring) {
    if (!targetString) {
        return false;
    }
    const normalize = (str) =>
        str
            .toLowerCase()
            .normalize("NFD")
            .replaceAll(/\p{Diacritic}/gu, "");
    return normalize(targetString).includes(normalize(substring));
}
