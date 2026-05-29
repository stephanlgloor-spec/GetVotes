import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-get-votes',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './get-votes.component.html',
  styleUrls: ['./get-votes.component.css']
})
export class GetVotesComponent {
  votes = 0;

  vote() {
    this.votes += 1;
  }
}
