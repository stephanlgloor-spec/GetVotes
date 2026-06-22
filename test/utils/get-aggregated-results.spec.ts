import { getAggregatedJSONResults, getAggregatedResults } from '@/app/utils/get-aggregated-results';

import { readFileSync } from 'fs';
import { resolve } from 'path';

import { expect, it, vi } from 'vitest';

describe('getAggregatedResults', () => {
  const csv = `Abstimmungs_Text,Ja_Absolut,Nein_Absolut,Kanton
Testvorlage 1,100,50,Zürich
Testvorlage 1,20,10,Zürich
Andere Vorlage,5,2,Bern`;
  // const originalfunction =  (window as any).fetch;
  beforeEach(() => {
    // Use Vitest `vi` to mock `fetch`
    (window as any).fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(csv)
    });
  });

  it('aggregates Zurich rows correctly', async () => {
    const result = await getAggregatedResults('/assets/daten/abstimmungen_seit1933.csv');
    expect(result).toEqual([
      { abstimmung: 'Testvorlage 1', ja: BigInt(120), nein: BigInt(60), kanton: 'Zürich' }
    ]);
  });

  it.skip('aggregates Zurich rows correctly from file in parquet format', async () => {
    const result = await getAggregatedJSONResults('/assets/daten/abstimmungen_seit1933.parquet');
    expect(result).toEqual([
      { abstimmung: 'Testvorlage 1', ja: BigInt(120), nein: BigInt(60), kanton: 'Zürich' }
    ]);
  });

  it('aggregates Zurich rows correctly in parquet format', async () => {

    // 1. Path to your local test file
    const path = resolve(__dirname, '../../src/assets/daten/abstimmungen_seit1933.parquet');

    // 2. Read file as a Buffer (Node.js binary format)
    const fileBuffer = readFileSync(path);
    const arrayBuffer = new Uint8Array(fileBuffer).slice().buffer

    //
    vi.restoreAllMocks();
    (window as any).fetch = vi.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(arrayBuffer),
    });

    const result = await getAggregatedJSONResults('/mocked/path/to/abstimmungen_seit1933.parquet');
    expect(result[0]).toEqual(

      {
        abstimmung: 'Volksinitiative «Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)»',
        ja: BigInt(312037), // why is it only zero? because the parquet file has bigint values, which are not handled correctly in the aggregation function.
        nein: BigInt(589809),
        kanton: 'Kanton Zürich'
      }
    );
  });
});
