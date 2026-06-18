import { getAggregatedJSONResults, getAggregatedResults } from '@/app/utils/get-aggregated-results';

describe('getAggregatedResults', () => {
  const csv = `Abstimmungs_Text,Ja_Absolut,Nein_Absolut,Kanton
Testvorlage 1,100,50,Zürich
Testvorlage 1,20,10,Zürich
Andere Vorlage,5,2,Bern`;

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
      { abstimmung: 'Testvorlage 1', ja: 120, nein: 60, kanton: 'Zürich' }
    ]);
  });


  it('aggregates Zurich rows correctly in parquet format', async () => {
    const result = await getAggregatedJSONResults('/home/stephan/develop/GetVotes/src/assets/daten/abstimmungen_seit1933.parquet');

    expect(result).toEqual([

      
      { abstimmung: 'Kantonsverfassung', ja: 120, nein: 60, kanton: 'Zürich' }
    ]);
  });
});
