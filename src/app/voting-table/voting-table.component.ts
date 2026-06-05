import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AggregatedResult } from '../utils';

@Component({
  selector: 'app-voting-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './voting-table.component.html',
  styleUrls: ['./voting-table.component.css']
})
export class VotingTableComponent {
  @Input() data: AggregatedResult[] = [];
  displayedColumns = ['index', 'abstimmung', 'ja', 'nein'];
}
