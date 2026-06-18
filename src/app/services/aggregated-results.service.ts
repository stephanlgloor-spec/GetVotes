import { Injectable } from '@angular/core';
import { AggregatedResult, getAggregatedJSONResults } from '../utils';

// const url = 'https://data.stadt-zuerich.ch/dataset/politik_abstimmungen_seit1933/download/abstimmungen_seit1933.parquet';

// const url = '/ktnzh/dataset/politik_abstimmungen_seit1933/download/abstimmungen_seit1933.parquet';
const url = undefined;

@Injectable({
  providedIn: 'root'
})
export class AggregatedResultsService {
  private results: AggregatedResult[] = [];
  loading = false;

  async loadAggregatedResults(): Promise<AggregatedResult[]> {
    this.loading = true;
    try {
      this.results = await (! url ? getAggregatedJSONResults() : getAggregatedJSONResults(url));
      const win = window as Window & { aggregated_results?: AggregatedResult[] };
      win.aggregated_results = this.results;
      return this.results;
    } finally {
      this.loading = false;
    }
  }

  getResults(): AggregatedResult[] {
    return this.results;
  }
}
