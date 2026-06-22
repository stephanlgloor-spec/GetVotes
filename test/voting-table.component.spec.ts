import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingTableComponent } from '@/app/voting-table/voting-table.component';

// 1. Force the test runner to skip looking for external HTML/CSS files synchronously
Component({
  selector: 'app-voting-table',
  template: '<table>Mock Voting Table Template</table>',
  styles: [],
  standalone: true
})(VotingTableComponent);

describe('VotingTableComponent', () => {
  let component: VotingTableComponent;
  let fixture: ComponentFixture<VotingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VotingTableComponent);
    component = fixture.componentInstance;
    // Resolve external template/style resources for standalone components
    // @ts-ignore
    await (TestBed as any).resolveComponentResources?.();
  });

  it('renders table rows for provided data', () => {
    component.data = [
      { abstimmung: 'Testvorlage 1', ja: 120, nein: 60, kanton: 'Zürich' }
    ];
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Testvorlage 1');
    expect(rows[0].textContent).toContain('120');
    expect(rows[0].textContent).toContain('60');
  });
});
