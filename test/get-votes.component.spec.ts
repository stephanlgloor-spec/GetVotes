import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetVotesComponent } from '../src/app/get-votes/get-votes.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


describe('GetVotesComponent', () => {
  let component: GetVotesComponent;
  let fixture: ComponentFixture<GetVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetVotesComponent, MatButtonModule, MatCardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GetVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment votes when vote() is called', () => {
    expect(component.votes).toBe(0);
    component.vote();
    expect(component.votes).toBe(1);
  });
});
