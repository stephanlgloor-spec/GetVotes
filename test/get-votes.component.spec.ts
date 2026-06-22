import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetVotesComponent } from '@/app/get-votes/get-votes.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';


// 1. Force the test runner to skip looking for external HTML/CSS files synchronously
Component({
  selector: 'app-get-votes',
  template: '<div>Mock Get Votes Template</div>',
  styles: [],
  standalone: true
})(GetVotesComponent);


describe('GetVotesComponent', () => {
  let component: GetVotesComponent;
  let fixture: ComponentFixture<GetVotesComponent>;

  beforeEach(async () => {
    // 2. Configure the testing module (Do NOT chain .compileComponents() here)
    TestBed.configureTestingModule({
      imports: [GetVotesComponent, MatButtonModule, MatCardModule]
    });
    // 3. Explicitly await the compilation step so Angular processes the inlined component safely
    await TestBed.compileComponents();

    // 4. Create the component instance and trigger change detection
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
