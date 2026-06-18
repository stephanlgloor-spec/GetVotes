import { readParquetFile } from "./read_parquet";

export interface AggregatedResult {
  abstimmung: string;
  ja: number;
  nein: number;
  kanton: string;
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

  for (const row of dataRows) {
    const kanton = idx.kanton >= 0 ? row[idx.kanton] || '' : '';
    if (!kanton.includes('Zürich')) {
      continue;
    }

    const abstimmung = idx.abstimmungsText >= 0 ? row[idx.abstimmungsText] || 'unbekannt' : 'unbekannt';
    const ja = idx.ja >= 0 ? Number(row[idx.ja] || 0) : 0;
    const nein = idx.nein >= 0 ? Number(row[idx.nein] || 0) : 0;

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
export async function getAggregatedJSONResults(  
  parquetUrl = '/assets/daten/abstimmungen_seit1933.parquet'
): Promise<AggregatedResult[]> {
  // const response = await fetch(parquetUrl);
  // if (!response.ok) {
  //   throw new Error(`JSON load failed: ${response.status}`);
  // }

  // const text = await response.text();
  
  const rows = await readParquetFile(parquetUrl); // array of rows 

  if (rows.length < 2) {
    return [];
  }

  // const header = rows[0];
  const dataRows = rows;
  

  // const idx = {
  //   abstimmungsText: header.indexOf('Abstimmungs_Text'),
  //   ja: header.indexOf('Ja_Absolut'),
  //   nein: header.indexOf('Nein_Absolut'),
  //   kanton: header.indexOf('Kanton')
  // };

  const groups = new Map<string, AggregatedResult>();

  for (const row of dataRows) {
    const kanton = row.kanton;
    if (kanton && !kanton.includes('Zürich') || !kanton) {
      continue;
    }

    const abstimmung = row.abstimmungsText.length >= 0 ? row.abstimmungsText || 'unbekannt' : 'unbekannt';
    const ja = row.ja.length >= 0 ? Number(row.ja || 0) : 0;
    const nein = row.nein.length >= 0 ? Number(row.nein || 0) : 0;

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
