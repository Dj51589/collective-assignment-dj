import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitstResultsComponent } from './gitst-results.component';

describe('GitstResultsComponent', () => {
  let component: GitstResultsComponent;
  let fixture: ComponentFixture<GitstResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitstResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitstResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
