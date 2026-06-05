import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingTableComponent } from '../src/app/voting-table/voting-table.component';

describe('VotingTableComponent', () => {
  let component: VotingTableComponent;
  let fixture: ComponentFixture<VotingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VotingTableComponent);
    component = fixture.componentInstance;
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
