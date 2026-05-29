import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GetVotesComponent } from './get-votes/get-votes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, GetVotesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GetVotes';
}
