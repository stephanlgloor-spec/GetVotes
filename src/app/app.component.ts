import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AggregatedResult } from './utils';
import { AggregatedResultsService } from './services/aggregated-results.service';
import { VotingTableComponent } from './voting-table/voting-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatProgressBarModule, VotingTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;
  results: AggregatedResult[] = [];

  constructor(private aggregatedResultsService: AggregatedResultsService) {}

  async ngOnInit(): Promise<void> {
    this.results = await this.aggregatedResultsService.loadAggregatedResults();
    this.loading = false;
  }
}
