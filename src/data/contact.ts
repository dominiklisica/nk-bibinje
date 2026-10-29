// Kontakt obrazac šalje upite na e-mail kluba preko servisa Web3Forms.
// Ključ se dobiva besplatno na https://web3forms.com (upišeš e-mail na koji
// želiš primati upite i ključ stigne tim e-mailom). Ključ je javan po
// dizajnu — smije stajati u kodu, jer samo određuje kamo poruke idu.
export const WEB3FORMS_ACCESS_KEY: string = '19f4bf55-b503-41a4-a71a-ecf944a29d59'

export const CONTACT_TOPICS = [
  'Opći upit',
  'Upis i treninzi',
  'Sponzorstvo i suradnja',
  'Utakmice i ulaznice',
  'Mediji',
  'Ostalo',
] as const
