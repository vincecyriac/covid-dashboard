import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowinComponent } from './cowin.component';

describe('CowinComponent', () => {
  let component: CowinComponent;
  let fixture: ComponentFixture<CowinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CowinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CowinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
