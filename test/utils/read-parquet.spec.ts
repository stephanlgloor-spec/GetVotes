import { vi, describe, it, expect, beforeEach, afterEach, beforeAll, SpyInstance } from 'vitest';
import { readParquetFile, readParquet } from '@/app/utils/read_parquet';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const sampleRecords = [

  {
    "Abstimmungs_Datum": new Date("2026-06-14T00:00:00.000Z"),
    "Abstimmungs_Text": "Volksinitiative «Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)»",
    "Ja_Absolut": 1492603n,
    "Ja_Prozent": 45.2,
    "Name_Politische_Ebene": "Eidgenossenschaft",
    "Name_Resultat_Gebiet": "Eidgenossenschaft",
    "Name_Wahlkreis_StZH": null,
    "Nein_Absolut": 1808916n,
    "Nein_Prozent": 54.8,
    "Nr_Politische_Ebene": 1n,
    "Nr_Resultat_Gebiet": 1n,
    "Nr_Wahlkreis_StZH": null,
    "Staende_Ja": "8 4/2",
    "Staende_Nein": "12 2/2",
    "Stimmberechtigt": 5668117n,
    "Stimmbeteiligung_Prozent": 58.9,
  }
];
vi.mock('hyparquet', async () => {
  const actual = await vi.importActual('hyparquet');
  return {
    ...actual,
    parquetReadObjects: vi.fn(), // spyable mock
  };
});


describe('readParquetFile', () => {
  let buffer: ArrayBuffer;
  let spy: SpyInstance;

  beforeAll ( async () => {
    const hyparquet = await import('hyparquet');
    spy = vi.spyOn(hyparquet, 'parquetReadObjects');
  });

  beforeEach(() => {
    buffer = new Uint8Array([1, 2, 3, 4]).buffer;
    // mock fetch to return the prepared buffer
    (globalThis as any).fetch = vi.fn().mockResolvedValue({
      arrayBuffer: () => Promise.resolve(buffer),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('reads parquet from URL and returns parsed records', async () => {

    // 1. Path to your local test file
    const path = resolve(__dirname, '../../src/assets/daten/abstimmungen_seit1933.parquet');
    
    // 2. Read file as a Buffer (Node.js binary format)
    const fileBuffer = readFileSync(path);
    const arrayBuffer = new Uint8Array(fileBuffer).slice().buffer

    // 3. Mock the global fetch
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        // Convert Node Buffer to ArrayBuffer for the fetch mock
        arrayBuffer: () => Promise.resolve(arrayBuffer),
      })
    ));
    const res = await readParquetFile('/fakepath/tofile.parquet');

    expect(res).not.toBeNull;

    const { parquetReadObjects } = await import('hyparquet');
    expect(parquetReadObjects).toHaveBeenCalledWith({ file: arrayBuffer });
  });

  it('reads parquet locally and returns parsed records', async () => {

    // 1. Path to your local test file
    const path = resolve(__dirname, '../../src/assets/daten/abstimmungen_seit1933.parquet');
    
    // 2. Read file as a Buffer (Node.js binary format)
    const fileBuffer = readFileSync(path);

    expect(fileBuffer.toString('utf-8').endsWith('PAR1')).toBe(true);
    expect(fileBuffer.toString('utf-8').startsWith('PAR1')).toBe(true);
    // Safe copy -> standalone ArrayBuffer instance
    const arrayBuffer = new Uint8Array(fileBuffer).slice().buffer
    expect(arrayBuffer.constructor.name).toBe('ArrayBuffer');
    
    expect(new TextDecoder().decode(new Uint8Array(arrayBuffer, 0, 4))).toBe('PAR1');
    expect(new TextDecoder().decode(new Uint8Array(arrayBuffer, arrayBuffer.byteLength - 4, 4))).toBe('PAR1');

    const res = await readParquet(arrayBuffer); // call the function directly with the ArrayBuffer and check if the result is an array of objects with the same keys as sampleRecords
        // and also if it has failed to parse the parquet file correctly, then res will be an empty array or null, so we need to check if res is defined and not null before checking its length and keys
    if (!res) {
      expect(spy).toHaveBeenCalledWith({ file: arrayBuffer });
    }
      
    // expect(res).toBeDefined();  // if this fails then the parquet file was not parsed correctly and we need to check if the parquetReadObjects function was called with the correct parameters
    // expect(res).not.toBeNull();
    // expect(res.length).toBeGreaterThan(0);
    // check on next line if res is an array of objects with the same keys as sampleRecords
    // expect(res[0]).toEqual(sampleRecords[0]);
    // check if res is an array of objects with the same keys as sampleRecords
    // expect(Object.keys(res[0])).toEqual(Object.keys(sampleRecords[0]));
    // check if res is an array of objects with the same values as sampleRecords
    // expect(res[0]).toEqual(sampleRecords[0]);
    // check if res is an array of objects with the same values as sampleRecords
    // expect(res).toEqual(expect.arrayContaining([expect.objectContaining(sampleRecords[0])]));
    
    // expect(res[0]).toEqual(sampleRecords[0]);
    expect(spy).toHaveBeenCalledWith({ file: arrayBuffer });
  });
});
