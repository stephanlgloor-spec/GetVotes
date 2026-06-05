import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../src/app/app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
 it('should render the title in the toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain('GetVotes');
  });
  it('should render the progress bar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance
    const compiled = fixture.nativeElement as HTMLElement;
    expect(app.loading).toBeTrue();
    expect(compiled.querySelector('mat-progress-bar')).toBeTruthy();
    app.loading = false;
    fixture.detectChanges();
    expect(compiled.querySelector('mat-progress-bar')).toBeFalsy();
  });
});
