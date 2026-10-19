// Grbovi klubova 1. ŽNL Zadarske — izvor: HNS Semafor (COMET).
// Bibinje koristi službeni grb iz /grb.jpg; ostali su u /public/klubovi/.
const CREST: Record<string, string> = {
  'NK Bibinje': '/grb.jpg',
  'NK Abeceda sporta': '/klubovi/abeceda.jpg',
  "NK Škabrnja '91": '/klubovi/skabrnja.jpg',
  'NŠK Zlatna Luka': '/klubovi/zlatna-luka.jpg',
  'NŠK Nova Zora': '/klubovi/nova-zora.jpg',
  'NŠK Raštane': '/klubovi/rastane.jpg',
  'HNK Velebit (B)': '/klubovi/velebit.jpg',
  'NŠK Debeljak': '/klubovi/debeljak.jpg',
  'NK Sabunjar': '/klubovi/sabunjar.jpg',
  'NK Hajduk (P)': '/klubovi/hajduk.jpg',
  'NK Pakoštane': '/klubovi/pakostane.jpg',
  'NK Dragovoljac': '/klubovi/dragovoljac.jpg',
  'NK Polača': '/klubovi/polaca.jpg',
  'NŠK Zemunik': '/klubovi/zemunik.jpg',
}

export function clubCrest(name: string): string | undefined {
  return CREST[name]
}

/** Inicijali kluba za slučaj da grb nedostaje. */
export function clubInitials(name: string): string {
  const clean = name.replace(/\(.*?\)/g, '').replace(/['"]/g, '').trim()
  const words = clean.split(/\s+/).filter((w) => !/^(NK|NŠK|HNK)$/i.test(w))
  return ((words[0]?.[0] ?? '') + (words[1]?.[0] ?? '')).toUpperCase()
}
