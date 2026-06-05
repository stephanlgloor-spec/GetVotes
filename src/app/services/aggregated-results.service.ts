import { Injectable } from '@angular/core';
import { AggregatedResult, getAggregatedResults } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AggregatedResultsService {
  private results: AggregatedResult[] = [];
  loading = false;

  async loadAggregatedResults(): Promise<AggregatedResult[]> {
    this.loading = true;
    try {
      this.results = await getAggregatedResults();
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
