import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;

export const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI ?? ''
    : process.env.NODE_ENV === 'development'
    ? process.env.DEV_MONGODB_URI ?? ''
    : process.env.MONGODB_URI ?? '';

export const ENTSOE_API_KEY = process.env.ENTSOE_API_KEY;

export const enum DocumentTypes {
  PRICE_DOCUMENT = 'A44',
}

export const enum BiddingZones {
  AL = '10YAL-KESH-----5', // Albania
  AT = '10Y1001A1001A63L', // Austria
  BA = '10YBA-JPCC-----D', // Bosnia and Herzegovina
  BE = '10YBE----------2', // Belgium
  BG = '10YCA-BULGARIA-R', // Bulgaria
  CH = '10YCH-SWISSGRIDZ', // Switzerland
  CZ = '10YCZ-CEPS-----N', // Czech Republic
  DK1 = '10YDK-1--------W', // Denmark zone 1
  DK2 = '10YDK-2--------M', // Denmark zone 2
  DE = '10Y1001A1001A63L', // Germany
  EE = '10Y1001A1001A39I', // Estonia
  ES = '10YES-REE§------0', // Spain
  FI = '10YFI-1--------U', // Finland
  FR = '10YFR-RTE------C', // France
  UK = '10YGB----------A', // United Kingdom
  GR = '10YGR-HTSO-----Y', // Greece
  HR = '10YHR-HEP------M', // Croatia
  HU = '10YHU-MAVIR----U', // Hungary
  IR = '10Y1001A1001A59C', // Ireland
  IT1 = '10Y1001A1001A73I', // Italy zone 1
  IT2 = '10Y1001A1001A70O', // Italy zone 2
  IT3 = '10Y1001A1001A71M', // Italy zone 3
  IT4 = '10Y1001A1001A788', // Italy zone 4
  IT5 = '10Y1001A1001A74G', // Italy zone 5
  IT6 = '10Y1001A1001A75E', // Italy zone 6
  LT = '10YLT-1001A0008Q', // Lithuania
  LU = '10Y1001A1001A63L', // Luxemburg
  LV = '10YLV-1001A00074', // Latvia
  ME = '10YCS-CG-TSO---S', // Montenegro
  MK = '10YMK-MEPSO----8', // FYROM (Former Yugoslav Republic of Macedonia)
  NL = '10YNL----------L', // The Netherlands
  NO1 = '10YNO-1--------2', // Norway zone 1
  NO2 = '10YNO-2--------T', // Norway zone 2
  NO3 = '10YNO-3--------J', // Norway zone 3
  NO4 = '10YNO-4--------9', // Norway zone 4
  NO5 = '10Y1001A1001A48H', // Norway zone 5
  PL = '10YPL-AREA-----S', // Poland
  PT = '10YPT-REN------W', // Portugal
  RO = '10YRO-TEL------P', // Romania
  RS = '10YCS-SERBIATSOV', // Serb
  SW1 = '10Y1001A1001A44P', // Sweden zone 1
  SW2 = '10Y1001A1001A45N', // Sweden zone 2
  SW3 = '10Y1001A1001A46L', // Sweden zone 3
  SW4 = '10Y1001A1001A47J', // Sweden zone 4
  SL = '10YSI-ELES-----O', // Slovenia
  SK = '10YSK-SEPS-----K', // Slovak Republic
}

export const enum TimeZones {
  AL = 'Europe/Tirane',
  AT = 'Europe/Vienna',
  BA = 'Europe/Sarajevo',
  BE = 'Europe/Brussels',
  BG = 'Europe/Sofia',
  CH = 'Europe/Zurich',
  CZ = 'Europe/Prague',
  DK = 'Europe/Copenhagen',
  DE = 'Europe/Berlin',
  EE = 'Europe/Tallinn',
  ES = 'Europe/Madrid',
  FI = 'Europe/Helsinki',
  FR = 'Europe/Paris',
  UK = 'Europe/London',
  GR = 'Europe/Athens',
  HR = 'Europe/Zagreb',
  HU = 'Europe/Budapest',
  IR = 'Europe/Dublin',
  IT = 'Europe/Rome',
  LT = 'Europe/Vilnius',
  LU = 'Europe/Luxembourg',
  LV = 'Europe/Riga',
  ME = 'Europe/Podgorica',
  MK = 'Europe/Skopje',
  NL = 'Europe/Amsterdam',
  NO = 'Europe/Oslo',
  PL = 'Europe/Warsaw',
  PT = 'Europe/Lisbon',
  RO = 'Europe/Bucharest',
  RS = 'Europe/Belgrade',
  SW = 'Europe/Stockholm',
  SL = 'Europe/Ljubljana',
  SK = 'Europe/Bratislava',
}
