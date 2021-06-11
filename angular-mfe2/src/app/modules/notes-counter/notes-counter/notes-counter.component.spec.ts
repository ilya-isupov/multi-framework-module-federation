import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCounterComponent } from './notes-counter.component';

describe('BusinessComponent', () => {
  let component: NotesCounterComponent;
  let fixture: ComponentFixture<NotesCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
