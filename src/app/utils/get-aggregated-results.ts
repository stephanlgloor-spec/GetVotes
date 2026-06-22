import { readParquetFile } from "./read_parquet";

export interface AggregatedResult {
  abstimmung: string;
  ja: bigint;
  nein: bigint;
  kanton: string;
}
export function getAggregatedResultsTitle(year = new Date().getFullYear()) {
  return `Abstimmungsresultate in Stadt und Kanton Zürich im Jahre ${year}.`;
}


function parseCsv(text: string): string[][] {
  return text
    .trim()
    .split(/\r?\n/)
    .map(line =>
      line
        .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
        .map(field => field.replace(/^"|"$/g, '').trim())
    );
}

export async function getAggregatedResults(
  csvUrl = '/assets/daten/abstimmungen_seit1933.csv'
): Promise<AggregatedResult[]> {
  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`CSV load failed: ${response.status}`);
  }

  const text = await response.text();
  const rows = parseCsv(text);

  if (rows.length < 2) {
    return [];
  }

  const header = rows[0];
  const dataRows = rows.slice(1);

  const idx = {
    abstimmungsText: header.indexOf('Abstimmungs_Text'),
    ja: header.indexOf('Ja_Absolut'),
    nein: header.indexOf('Nein_Absolut'),
    kanton: header.indexOf('Kanton')
  };

  const groups = new Map<string, AggregatedResult>();

  const toBigIntSafe = (v: any) => {
    if (v === null || v === undefined || v === '') return 0n;
    if (typeof v === 'bigint') return v;
    if (typeof v === 'number') return BigInt(Math.trunc(v));
    const s = String(v).replace(/\s|,/g, '').replace(/\..*$/, ''); // remove spaces/commas and decimals
    if (/^-?\d+$/.test(s)) return BigInt(s);
    return 0n;
  };

  for (const row of dataRows) {
    const kanton = idx.kanton >= 0 ? row[idx.kanton] || '' : '';
    if (!kanton.includes('Zürich')) {
      continue;
    }

    const abstimmung = idx.abstimmungsText >= 0 ? row[idx.abstimmungsText] || 'unbekannt' : 'unbekannt';
    const ja = idx.ja >= 0 ? toBigIntSafe(row[idx.ja]) : 0n;
    const nein = idx.nein >= 0 ? toBigIntSafe(row[idx.nein]) : 0n;

    const existing = groups.get(abstimmung);
    if (existing) {
      existing.ja = existing.ja + ja;
      existing.nein = existing.nein + nein;
    } else {
      groups.set(abstimmung, {
        abstimmung,
        ja,
        nein,
        kanton
      });
    }
  }

  return Array.from(groups.values());
}
export async function getAggregatedJSONResults(
  parquetUrl = '/assets/daten/abstimmungen_seit1933.parquet',
  year?: number
): Promise<AggregatedResult[]> {
  const filterYear = year ?? new Date().getFullYear();

  const rows = await readParquetFile(parquetUrl); // array of rows 

  if (!rows || rows.length === 0) {
    return [];
  }

  const groups = new Map<string, AggregatedResult>();

  for (const row of rows) {
    // filter by canton
    const kanton = row.Name_Resultat_Gebiet;
    if (kanton && (!kanton.includes('Kanton Zürich') && !kanton.includes('Stadt Zürich')) || !kanton) {
      continue;
    }

    // filter by year of Abstimmungs_Datum
    const rawDate = row.Abstimmungs_Datum;
    const date = rawDate ? new Date(rawDate) : null;
    if (!date || isNaN(date.getTime()) || date.getFullYear() !== filterYear) {
      continue;
    }

    const abstimmung = row.Abstimmungs_Text ? String(row.Abstimmungs_Text) : 'unbekannt';

    const toBigIntSafe = (v: any) => {
      if (v === null || v === undefined) return 0n;
      if (typeof v === 'bigint') return v;
      // numeric strings or numbers
      return BigInt(v);
    };

    const ja = toBigIntSafe(row.Ja_Absolut);
    const nein = toBigIntSafe(row.Nein_Absolut);

    // debug logs (only printed when log level is 'debug')
    // debug('aggregating abstimmung:', abstimmung);
    // debug('values ja/nein:', ja, nein);

    const existing = groups.get(abstimmung);
    if (existing) {
      existing.ja += ja;
      existing.nein += nein;
    } else {
      groups.set(abstimmung, {
        abstimmung,
        ja,
        nein,
        kanton
      });
    }
  }

  return Array.from(groups.values());
}
