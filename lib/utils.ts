import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatInTimeZone } from "date-fns-tz"
import { hu } from "date-fns/locale"
import {
  buildCountryData,
  type CountryData,
  type CountryIso2,
  defaultCountries,
  parseCountry
} from "react-international-phone"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(text: string) {
  const [firstLetter, ...remainingLetters] = text.split("")
  return [firstLetter.toUpperCase(), ...remainingLetters].join("")
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

// Formatters
export const formatDate = (date: Date | string): string => {
  const safeDate = date instanceof Date ? date : new Date(date)

  const dateOnly = formatInTimeZone(safeDate, "Europe/Budapest", "yyyy-MM-dd", {
    locale: hu
  })

  return dateOnly
}

export const formatDateToDateTime = (date: Date | string): string => {
  const safeDate = date instanceof Date ? date : new Date(date)

  const dateOnly = formatInTimeZone(safeDate, "Europe/Budapest", "yyyy-MM-dd HH:mm", {
    locale: hu
  })

  return dateOnly
}

export function getFullName({ firstname, lastname }: { lastname?: string | null; firstname?: string | null }) {
  let fullname = ""

  if (lastname) fullname = capitalize(lastname)
  if (firstname) fullname += fullname.length ? ` ${capitalize(firstname)}` : capitalize(firstname)

  return fullname
}

export function getJsonValue({ json, key }: { json?: Json; key: string }) {
  const value = json && typeof json === "object" && !Array.isArray(json) && key in json && json[key]

  return value
}

export const parseEnumIntoOptions = (enumArr: readonly string[]): string[] => {
  return enumArr.map((x) => String(x))
}

const huCountryArr: Record<CountryIso2, string> = {
  fo: "",
  pm: "",
  wf: "",
  yt: "",
  af: "Afganisztán",
  al: "Albánia",
  dz: "Algéria",
  ad: "Andorra",
  ao: "Angola",
  ag: "Antigua és Barbuda",
  ar: "Argentína",
  am: "Örményország",
  aw: "Aruba",
  au: "Ausztrália",
  at: "Ausztria",
  az: "Azerbajdzsán",
  bs: "Bahama-szigetek",
  bh: "Bahrein",
  bd: "Banglades",
  bb: "Barbados",
  by: "Belarusz",
  be: "Belgium",
  bz: "Belize",
  bj: "Benin",
  bt: "Bhután",
  bo: "Bolívia",
  ba: "Bosznia és Hercegovina",
  bw: "Botswana",
  br: "Brazília",
  io: "Brit Indiai-óceáni Terület",
  bn: "Brunei",
  bg: "Bulgária",
  bf: "Burkina Faso",
  bi: "Burundi",
  kh: "Kambodzsa",
  cm: "Kamerun",
  ca: "Kanada",
  cv: "Zöld-foki Köztársaság",
  bq: "Holland Karib-térség",
  ky: "Kajmán-szigetek",
  cf: "Közép-afrikai Köztársaság",
  td: "Csád",
  cl: "Chile",
  cn: "Kína",
  co: "Kolumbia",
  km: "Comore-szigetek",
  cd: "Kongói Demokratikus Köztársaság",
  cg: "Kongó",
  cr: "Costa Rica",
  ci: "Elefántcsontpart",
  hr: "Horvátország",
  cu: "Kuba",
  cw: "Curaçao",
  cy: "Ciprus",
  cz: "Csehország",
  dk: "Dánia",
  dj: "Dzsibuti",
  dm: "Dominika",
  do: "Dominikai Köztársaság",
  ec: "Ecuador",
  eg: "Egyiptom",
  sv: "Salvador",
  gq: "Egyenlítői-Guinea",
  er: "Eritrea",
  ee: "Észtország",
  et: "Etiópia",
  fj: "Fidzsi-szigetek",
  fi: "Finnország",
  fr: "Franciaország",
  gf: "Francia Guyana",
  pf: "Francia Polinézia",
  ga: "Gabon",
  gm: "Gambia",
  ge: "Grúzia",
  de: "Németország",
  gh: "Ghána",
  gr: "Görögország",
  gl: "Grönland",
  gd: "Grenada",
  gp: "Guadeloupe",
  gu: "Guam",
  gt: "Guatemala",
  gn: "Guinea",
  gw: "Bissau-Guinea",
  gy: "Guyana",
  ht: "Haiti",
  hn: "Honduras",
  hk: "Hongkong",
  hu: "Magyarország",
  is: "Izland",
  in: "India",
  id: "Indonézia",
  ir: "Irán",
  iq: "Irak",
  ie: "Írország",
  il: "Izrael",
  it: "Olaszország",
  jm: "Jamaica",
  jp: "Japán",
  jo: "Jordánia",
  kz: "Kazahsztán",
  ke: "Kenya",
  ki: "Kiribati",
  xk: "Koszovó",
  kw: "Kuvait",
  kg: "Kirgizisztán",
  la: "Laosz",
  lv: "Lettország",
  lb: "Libanon",
  ls: "Lesotho",
  lr: "Libéria",
  ly: "Líbia",
  li: "Liechtenstein",
  lt: "Litvánia",
  lu: "Luxemburg",
  mo: "Makaó",
  mk: "Észak-Macedónia",
  mg: "Madagaszkár",
  mw: "Malawi",
  my: "Malajzia",
  mv: "Maldív-szigetek",
  ml: "Mali",
  mt: "Málta",
  mh: "Marshall-szigetek",
  mq: "Martinique",
  mr: "Mauritánia",
  mu: "Mauritius",
  mx: "Mexikó",
  fm: "Mikronézia",
  md: "Moldova",
  mc: "Monaco",
  mn: "Mongólia",
  me: "Montenegró",
  ma: "Marokkó",
  mz: "Mozambik",
  mm: "Mianmar",
  na: "Namíbia",
  nr: "Nauru",
  np: "Nepál",
  nl: "Hollandia",
  nc: "Új-Kaledónia",
  nz: "Új-Zéland",
  ni: "Nicaragua",
  ne: "Niger",
  ng: "Nigéria",
  kp: "Észak-Korea",
  no: "Norvégia",
  om: "Omán",
  pk: "Pakisztán",
  pw: "Palau",
  ps: "Palesztina",
  pa: "Panama",
  pg: "Pápua Új-Guinea",
  py: "Paraguay",
  pe: "Peru",
  ph: "Fülöp-szigetek",
  pl: "Lengyelország",
  pt: "Portugália",
  pr: "Puerto Rico",
  qa: "Katar",
  re: "Réunion",
  ro: "Románia",
  ru: "Oroszország",
  rw: "Ruanda",
  kn: "Saint Kitts és Nevis",
  lc: "Saint Lucia",
  vc: "Saint Vincent és a Grenadine-szigetek",
  ws: "Szamoa",
  sm: "San Marino",
  st: "Sao Tomé és Príncipe",
  sa: "Szaúd-Arábia",
  sn: "Szenegál",
  rs: "Szerbia",
  sc: "Seychelle-szigetek",
  sl: "Sierra Leone",
  sg: "Szingapúr",
  sk: "Szlovákia",
  si: "Szlovénia",
  sb: "Salamon-szigetek",
  so: "Szomália",
  za: "Dél-afrikai Köztársaság",
  kr: "Dél-Korea",
  ss: "Dél-Szudán",
  es: "Spanyolország",
  lk: "Srí Lanka",
  sd: "Szudán",
  sr: "Suriname",
  sz: "Szváziföld",
  se: "Svédország",
  ch: "Svájc",
  sy: "Szíria",
  tw: "Tajvan",
  tj: "Tádzsikisztán",
  tz: "Tanzánia",
  th: "Thaiföld",
  tl: "Kelet-Timor",
  tg: "Togo",
  to: "Tonga",
  tt: "Trinidad és Tobago",
  tn: "Tunézia",
  tr: "Törökország",
  tm: "Türkmenisztán",
  tv: "Tuvalu",
  ug: "Uganda",
  ua: "Ukrajna",
  ae: "Egyesült Arab Emírségek",
  gb: "Egyesült Királyság",
  us: "Egyesült Államok",
  uy: "Uruguay",
  uz: "Üzbegisztán",
  vu: "Vanuatu",
  va: "Vatikánváros",
  ve: "Venezuela",
  vn: "Vietnam",
  ye: "Jemen",
  zm: "Zambia",
  zw: "Zimbabwe"
}

export const enCountries = defaultCountries.map((country) => {
  const parsedCountry = parseCountry(country)

  if (parsedCountry.iso2 !== "hu") return country

  parsedCountry.format = {
    default: ".. ... ...",
    "/^1/": ". ... ....",
    "/^(30|20|70)/": ".. ... ...."
  }

  return buildCountryData(parsedCountry)
})

export const huCountries = enCountries.map((country) => {
  const parsedCountry = parseCountry(country)

  parsedCountry.name = huCountryArr[parsedCountry.iso2]

  return buildCountryData(parsedCountry)
})

export const lookupDefaultCountries: Partial<Record<string, CountryData[]>> = {
  en: enCountries,
  hu: huCountries
}
