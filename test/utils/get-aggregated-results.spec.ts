import { getAggregatedResults } from '../../src/app/utils/get-aggregated-results';

describe('getAggregatedResults', () => {
  const csv = `Abstimmungs_Text,Ja_Absolut,Nein_Absolut,Kanton
Testvorlage 1,100,50,Zürich
Testvorlage 1,20,10,Zürich
Andere Vorlage,5,2,Bern`;

  beforeEach(() => {
    interface FakeFetchResponse {
      ok: boolean;
      text(): Promise<string>;
    }

    const win = window as unknown as {
      fetch(input: RequestInfo, init?: RequestInit): Promise<FakeFetchResponse>;
    };

    spyOn(win, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(csv)
      })
    );
  });

  it('aggregates Zurich rows correctly', async () => {
    const result = await getAggregatedResults('/assets/daten/abstimmungen_seit1933.csv');
    expect(result).toEqual([
      { abstimmung: 'Testvorlage 1', ja: 120, nein: 60, kanton: 'Zürich' }
    ]);
  });
});
